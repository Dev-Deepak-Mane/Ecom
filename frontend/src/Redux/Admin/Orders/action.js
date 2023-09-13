import axios from "axios";
import * as types from "./actionTypes";

///get all Oreders list for admin
export const getAdminAllOrders = (toast) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/orders`;
  dispatch({ type: types.ADMIN_ALL_ORDERS_REQUEST });
  try {
    const { data } = await axios.get(apiLink, { withCredentials: true });

    dispatch({ type: types.ADMIN_ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_ALL_ORDERS_FAIL,
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

//clearing error form state
export const AllAdiminProducts = (store) => store.adminProducts;
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

///Delete Order at Admin side
export const deleteAdminOrder = (toast, id) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/order/${id}`;

  dispatch({ type: types.ADMIN_ORDER_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(apiLink, { withCredentials: true });
    toast({
      title: "Order Deleted Successfully",
      description: "",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({
      type: types.ADMIN_ORDER_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_ORDER_DELETE_FAIL,
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

///Update Order at Admin side
export const updateAdminOrderProcess =
  (toast, id, updatedData) => async (dispatch) => {
    let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/order/${id}`;
    dispatch({ type: types.ADMIN_ORDER_UPDATE_REQUEST });

    try {
      const { data } = await axios.put(apiLink, updatedData, {
        withCredentials: true,
      });
      dispatch({
        type: types.ADMIN_ORDER_UPDATE_SUCCESS,
        payload: data.success,
      });
      toast({
        title: "Order updated Successfully",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.ADMIN_ORDER_UPDATE_FAIL,
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
