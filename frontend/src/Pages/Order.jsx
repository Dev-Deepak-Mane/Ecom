import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Image,
  Stack,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getMyOrdersList } from "../Redux/Order/action";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const theme = useColorMode().colorMode;
  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const { orders } = useSelector((store) => store.myOrdersList);

  const rowData = orders;

  const [columnDefs] = useState([
    {
      headerName: "Order ID",
      field: "_id",

      headerClass: "blueHeader",
    },
    {
      field: "orderStatus",
      headerName: "Status",

      headerClass: "blueHeader",
      cellClass: (params) => {
        return params.value === "Proccessing"
          ? "proccessingText"
          : "deliveredText";
      },
    },
    {
      field: "orderItems.length",
      headerName: "Items Qty",
      headerClass: "blueHeader",
    },
    {
      field: "totalPrice",

      headerName: "Amount",
      headerClass: "blueHeader",
    },

    {
      field: "action",
      headerClass: "blueHeader",
      headerName: "Actions",
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        const id = params.data._id;
        const linkUrl = `/orders/${id}`;
        return (
          <Link to={linkUrl}>
            <Icon as={FaExternalLinkAlt}></Icon>
          </Link>
        );
      },
    },
  ]);

  useEffect(() => {
    dispatch(getMyOrdersList(toast));
  }, []);

  return (
    <>
      {orders && orders?.length > 0 ? (
        <Box
          p="10"
          className={
            theme === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark"
          }
          style={{ height: "800px" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
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
          <Stack>
            <Box w="80%" m={"auto"}>
              <Image
                src="https://vanamindiafoundation.org/assets/front/images/emptycart.png"
                alt="empty cart image"
              ></Image>
            </Box>
            <Heading>You have not placed order yet</Heading>
            <Box display={"flex"} justifyContent={"center"}>
              <Button w="xs" bgColor={"blue.500"} as={Link} to="/products">
                Shop
              </Button>
            </Box>
          </Stack>
        </Center>
      )}
    </>
  );
};

export default Order;
