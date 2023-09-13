import axios from "axios";
import * as types from "./actionTypes";

///get all proudcts list for admin
export const getAdminProducts = (toast) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/products`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  dispatch({ type: types.ADMIN_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get(
      apiLink,
      { withCredentials: true },
      config
    );

    dispatch({ type: types.ADMIN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_PRODUCTS_FAIL,
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

//clearing error form state
export const AllAdiminProducts = (store) => store.adminProducts;
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

/// create new product at admin side
export const createAdminProduct = (toast, productData) => async (dispatch) => {
  dispatch({ type: types.ADMIN_PRODUCT_CREATE_REQUEST });
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/admin/product/new`,
      productData,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: types.ADMIN_PRODUCT_CREATE_SUCCESS, payload: data });

    toast({
      title: "New Product Created",
      description: ``,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_PRODUCT_CREATE_FAIL,
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

///Delete proudct at Admin side
export const deleteAdminProduct = (toast, id) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/product/${id}`;

  //dispatch({ type: types.ADMIN_PRODUCT_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(apiLink, { withCredentials: true });
    toast({
      title: "Product Deleted Successfully",
      description: "",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    // dispatch({
    //   type: types.ADMIN_PRODUCT_DELETE_REQUEST,
    //   payload: data.products,
    // });
  } catch (error) {
    console.log(error);

    // dispatch({
    //   type: types.ADMIN_PRODUCT_DELETE_FAIL,
    //   payload: error.response.data.message || error.message,
    // });
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

///Update proudct at Admin side
export const updateAdminProduct =
  (toast, id, updatedData) => async (dispatch) => {
    let apiLink = `${process.env.REACT_APP_BASE_URL}/admin/product/${id}`;

    try {
      const { data } = await axios.put(apiLink, updatedData, {
        withCredentials: true,
      });
      toast({
        title: "Product updated Successfully",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);

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
