import * as types from "./actionTypes";
///get all reviews list at admin side
export const adminReviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case types.ADMIN_ALL_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case types.ADMIN_ALL_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

///update or delete from user list at admin side
export const adminReviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_REVIEW_DELETE_FAIL:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_REVIEW_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case types.ADMIN_REVIEW_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
