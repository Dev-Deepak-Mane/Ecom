import axios from "axios";
import * as types from "./actionTypes";

///get all Reviews list for admin
export const getAdminAllReviews = (toast, productId) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/reviews?id=${productId}`;
  dispatch({ type: types.ADMIN_ALL_REVIEWS_REQUEST });
  try {
    const { data } = await axios.get(apiLink, { withCredentials: true });

    dispatch({ type: types.ADMIN_ALL_REVIEWS_SUCCESS, payload: data.reviews });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.ADMIN_ALL_REVIEWS_FAIL,
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
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

///Delete review at Admin side
export const deleteAdminReview =
  (toast, reviewId, productId) => async (dispatch) => {
    let apiLink = `${process.env.REACT_APP_BASE_URL}/reviews?id=${reviewId}&productId=${productId}`;

    dispatch({ type: types.ADMIN_REVIEW_DELETE_REQUEST });
    try {
      const { data } = await axios.delete(apiLink, { withCredentials: true });
      toast({
        title: "Review Deleted Successfully",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      dispatch({
        type: types.ADMIN_REVIEW_DELETE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: types.ADMIN_REVIEW_DELETE_FAIL,
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
