import axios from "axios";
import * as types from "./actionTypes";

///get all users list for admin
export const getAdminAllUsers = (toast) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/users`;
  dispatch({ type: types.ADMIN_ALL_USERS_REQUEST });
  try {
    const { data } = await axios.get(apiLink, { withCredentials: true });

    dispatch({ type: types.ADMIN_ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_ALL_USERS_FAIL,
      payload: error.response.data.message || error.message,
    });
    if (toast) {
      toast({
        title: "An error occurred.",
        description: `${error.response.data.message || error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    dispatch(clearErrors());
  }
};

// ///get user details at admin side
// export const getAdminUserDetails = (toast, id) => async (dispatch) => {
//   let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/user/${id}`;
//   dispatch({ type: types.ADMIN_USER_DETAILS_REQUEST });
//   try {
//     const { data } = await axios.get(apiLink, { withCredentials: true });

//     dispatch({ type: types.ADMIN_USER_DETAILS_SUCCESS, payload: data.user });
//   } catch (error) {
//     console.log(error);

//     dispatch({
//       type: types.ADMIN_USER_DETAILS_FAIL,
//       payload: error.response.data.message || error.message,
//     });
//     toast({
//       title: "An error occurred.",
//       description: `${error.response.data.message || error.message}`,
//       status: "error",
//       duration: 4000,
//       isClosable: true,
//     });
//     dispatch(clearErrors());
//   }
// };

//clearing error form state
export const AllAdiminProducts = (store) => store.adminProducts;
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

///Delete user at Admin side
export const deleteAdminuser = (toast, id) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/user/${id}`;

  dispatch({ type: types.ADMIN_USER_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(apiLink, { withCredentials: true });
    toast({
      title: "user Deleted Successfully",
      description: "",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({
      type: types.ADMIN_USER_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_USER_DELETE_FAIL,
      payload: error.response.data.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error.response.data.message || error.message}`,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

///Update user at Admin side
export const updateAdminUserRole =
  (toast, id, updatedData) => async (dispatch) => {
    let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/user/${id}`;
    dispatch({ type: types.ADMIN_USER_UPDATE_REQUEST });

    try {
      const { data } = await axios.patch(apiLink, updatedData, {
        withCredentials: true,
      });
      dispatch({
        type: types.ADMIN_USER_UPDATE_SUCCESS,
        payload: data.success,
      });
      toast({
        title: "user updated Successfully",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.ADMIN_USER_UPDATE_FAIL,
        payload: error.response.data.message || error.message,
      });
      toast({
        title: "An error occurred.",
        description: `${error.response.data.message || error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }
  };
