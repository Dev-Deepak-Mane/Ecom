import axios from "axios";
import * as types from "./actionTypes";

///get all proudcts list
export const getProducts =
  (toast, { params }, query, category, ratings) =>
  async (dispatch) => {
    params["ratings[gte]"] = ratings;
    if (query) {
      params = {
        keyword: query,
        page: "1",
        "price[gte]": 0,
        "price[lte]": 30000,
      };
    } else {
      if (category?.length) {
        params.category = category;
      }
    }
    //console.log("xxxxxxxxx22222222222", params, query, category);
    let apiLink = `https://drab-erin-bandicoot-hem.cyclic.app/products`;

    //&price[gte]=${price[0]}&price[lte]=${price[1]}
    dispatch({ type: types.ALL_PRODUCTS_REQUEST });
    try {
      const { data } = await axios.get(apiLink, { params });

      dispatch({ type: types.ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);

      dispatch({
        type: types.ALL_PRODUCTS_FAIL,
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
// export const getProducts = (toast, params) => async (dispatch) => {
//   dispatch({ type: types.ALL_PRODUCTS_REQUEST });

//   try {
//     const { data } = await axios.get("https://drab-erin-bandicoot-hem.cyclic.app/products", {
//       params,
//     });
//     // console.log(data);
//     dispatch({ type: types.ALL_PRODUCTS_SUCCESS, payload: data });
//   } catch (error) {
//     console.log(error);

//     dispatch({
//       type: types.ALL_PRODUCTS_FAIL,
//       payload: error.response.data.message || error.message,
//     });

//     toast({
//       title: "An error occurred.",
//       description: `${error.response.data.message || error.message}`,
//       status: "error",
//       duration: 4000,
//       isClosable: true,
//     });
//   }
// };
//clearing error form state
export const AllProducts = (store) => store.products;
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

///get single proudcts details
export const getProductDetails = (id, toast) => async (dispatch) => {
  dispatch({ type: types.PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `https://drab-erin-bandicoot-hem.cyclic.app/product/${id}`
    );

    dispatch({ type: types.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.PRODUCT_DETAILS_FAIL,
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

/// add new Review to each product
export const addNewReview = (toast, reviewData) => async (dispatch) => {
  dispatch({ type: types.ADD_NEW_REVIEW_REQUEST });
  try {
    const { data } = await axios.put(
      `https://drab-erin-bandicoot-hem.cyclic.app/review`,
      reviewData,
      { withCredentials: true }
    );

    dispatch({ type: types.ADD_NEW_REVIEW_SUCCESS, payload: data });

    toast({
      title: "Review Added",
      description: ``,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADD_NEW_REVIEW_FAIL,
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
