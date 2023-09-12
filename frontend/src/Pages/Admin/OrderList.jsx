import { useDispatch, useSelector } from "react-redux";

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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import React from "react";
import { Link } from "react-router-dom";
import {
  deleteAdminOrder,
  getAdminAllOrders,
} from "../../Redux/Admin/Orders/action";

const OrderList = () => {
  //   const { products } = useSelector(AllAdiminProducts);
  const dispatch = useDispatch();
  const theme = useColorMode().colorMode;
  const { toast } = createStandaloneToast();

  const orderDataList = useSelector((store) => store.allOrders.orders);

  function handleDelete(data) {
    const orderId = data._id;
    console.log(orderId);
    dispatch(deleteAdminOrder(toast, orderId)).then(() =>
      dispatch(getAdminAllOrders())
    );
  }

  const data = orderDataList;

  const columns = [
    {
      headerName: "Order ID",
      field: "_id",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Status",
      field: "orderStatus",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Item Qty",
      field: "orderItems.length",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Amount",
      field: "totalPrice",
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
            <Link to={`/dashboard/orders/${params.data._id}`}>
              <IconButton aria-label="Edit" icon={<EditIcon />} size="lg" />
            </Link>
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

export default OrderList;
