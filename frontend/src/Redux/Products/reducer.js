import * as types from "./actionTypes";
///get all proudcts list
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case types.ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case types.ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filterProductsCount: action.payload.filterProductsCount,
      };
    case types.ALL_PRODUCTS_FAIL:
      return {
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

///get single proudcts details
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case types.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case types.PRODUCT_DETAILS_FAIL:
      return {
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

///adding new review to products reducer

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case types.ADD_NEW_REVIEW_FAIL:
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
