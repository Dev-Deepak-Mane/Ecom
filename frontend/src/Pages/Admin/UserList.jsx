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

import {
  deleteAdminuser,
  getAdminAllUsers,
} from "../../Redux/Admin/Users/action";
import EditUserModel from "./EditUserModel";

const UserList = () => {
  const userDataList = useSelector((store) => store.allUsers.users);
  console.log(userDataList);
  const dispatch = useDispatch();
  const theme = useColorMode().colorMode;
  const { toast } = createStandaloneToast();

  function handleDelete(data) {
    const userId = data._id;
    dispatch(deleteAdminuser(toast, userId)).then(() =>
      dispatch(getAdminAllUsers(toast))
    );
  }
  const data = userDataList;

  const columns = [
    {
      headerName: "User ID",
      field: "_id",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      headerClass: "blueHeader ",
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
    },

    {
      headerName: "Role",
      field: "role",
      sortable: true,
      filter: true,
      headerClass: "blueHeader",
      cellStyle: function (params) {
        if (params.data.role === "admin") {
          return {
            backgroundColor: "rgb(49, 130, 206)",
            fontWeight: "bold",
          };
        }
        return;
      },
    },

    {
      headerName: "Actions",
      field: "actions",
      headerClass: "blueHeader",
      cellRenderer: function (params) {
        return (
          <HStack gap="10px" pb="2">
            <EditUserModel user={params.data} />
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

export default UserList;
