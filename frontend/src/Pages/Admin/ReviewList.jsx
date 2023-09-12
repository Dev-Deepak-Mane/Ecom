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
  Input,
  InputRightElement,
  InputGroup,
  Heading,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  deleteAdminReview,
  getAdminAllReviews,
} from "../../Redux/Admin/Reviews/action";
import { useEffect } from "react";
import { useState } from "react";

const ReviewList = () => {
  const dispatch = useDispatch();
  const theme = useColorMode().colorMode;
  const { toast } = createStandaloneToast();
  const [productId, setProductId] = useState("");
  const reviewDataList = useSelector(
    (store) => store.productAdminReviewList.reviews
  );

  const data = reviewDataList;
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAdminAllReviews(toast, productId));
    }
  }, [dispatch, productId]);
  const columns = [
    {
      headerName: "Review ID",
      field: "_id",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "User",
      field: "name",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Comment",
      field: "comment",
      sortable: true,
      filter: true,
      headerClass: "blueHeader ",
    },

    {
      headerName: "Rating",
      field: "rating",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
      cellStyle: function (params) {
        return params?.data?.rating >= 3
          ? {
              color: "green",
            }
          : {
              color: "red",
            };
      },
    },

    {
      headerName: "Actions",
      field: "actions",
      headerClass: "blueHeader",
      cellRenderer: function (params) {
        return (
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            size="lg"
            onClick={() => handleDelete(params.data)}
          />
        );
      },
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(getAdminAllReviews(toast, productId));
  };
  function handleDelete(data) {
    const reviewId = data._id;

    dispatch(deleteAdminReview(toast, reviewId, productId)).then(() =>
      dispatch(getAdminAllReviews(toast, productId))
    );
  }

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Box maxWidth="400px" width="100%" p="4">
          <form onSubmit={handleSubmit}>
            <Flex mb="4">
              <Input
                type="text"
                placeholder="Enter ProductId..."
                flex="1"
                pr="4.5rem"
                transition="all 0.2s"
                onChange={(e) => setProductId(e.target.value)}
                _focus={{ boxShadow: "outline" }}
              />

              <Button
                colorScheme="teal"
                type="submit"
                ml="2"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              >
                Search
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
      {reviewDataList && reviewDataList.length > 0 ? (
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
      ) : (
        <Center>
          <Heading>No data found</Heading>
        </Center>
      )}
    </>
  );
};

export default ReviewList;
