import axios from "axios";
import * as types from "./actionTypes";

/// create order by user
export const creatOrder = (toast, order) => async (dispatch, getState) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/order/new`;

  dispatch({ type: types.CREATE_ORDER_REQUEST });

  try {
    const { data } = await axios.post(apiLink, order, {
      withCredentials: true,
    });

    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: data });
    toast({
      title: `Order Success`,
      description: `Thank you for purchase`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.CREATE_ORDER_FAIL,
      payload: error.response.data.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error.response.data.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

/// get orders List for user
export const getMyOrdersList = (toast) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/orders/me`;

  dispatch({ type: types.MY_ORDERS_LIST_REQUEST });

  try {
    const { data } = await axios.get(apiLink, {
      withCredentials: true,
    });

    dispatch({ type: types.MY_ORDERS_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.MY_ORDERS_LIST_FAIL,
      payload: error.response.data.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error.response.data.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

/// get perticular Order Details
export const getOrderDetails = (toast, id) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/order/${id}`;

  dispatch({ type: types.MY_ORDER_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(apiLink, {
      withCredentials: true,
    });

    dispatch({ type: types.MY_ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.MY_ORDER_DETAILS_FAIL,
      payload: error.response.data.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error.response.data.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
