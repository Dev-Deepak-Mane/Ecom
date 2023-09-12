import { useDispatch, useSelector } from "react-redux";
import {
  AllAdiminProducts,
  deleteAdminProduct,
  getAdminProducts,
} from "../../Redux/Admin/Products/action";
import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  useStyleConfig,
  useColorMode,
  Button,
  createStandaloneToast,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteIcon } from "@chakra-ui/icons";
import CreateProductModel from "./CreateProductModel";
import EditProductModel from "./EditProductModel";

const ProductList = () => {
  const { products } = useSelector(AllAdiminProducts);
  const dispatch = useDispatch();
  const theme = useColorMode().colorMode;
  const { toast } = createStandaloneToast();

  function handleDelete(data) {
    const productId = data._id;
    dispatch(deleteAdminProduct(toast, productId)).then(() =>
      dispatch(getAdminProducts())
    );
  }
  const data = products;

  const columns = [
    {
      headerName: "Product ID",
      field: "_id",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Stock",
      field: "Stock",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Actions",
      field: "actions",
      headerClass: "blueHeader",
      cellRenderer: function (params) {
        return (
          <HStack gap="10px" pb="2">
            <EditProductModel product={params.data} />
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              size="lg"
              onClick={() => handleDelete(params.data)}
            />
          </HStack>
        );
      },
    },
  ];
  return (
    <>
      <Flex justify={"end"}>
        <CreateProductModel />
      </Flex>

      <Box
        p="10"
        className={
          theme === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark"
        }
        style={{ height: "800px" }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={13}
          animateRows={true}
          suppressCellFocus={true}
          rowSelection="single"
          headerHeight={60}
          rowHeight={50}
          enableCellTextSelection={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
          }}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default ProductList;
