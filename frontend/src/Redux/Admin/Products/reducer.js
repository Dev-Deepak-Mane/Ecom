import * as types from "./actionTypes";
///get all proudcts list
export const adminProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case types.ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case types.ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case types.ADMIN_PRODUCTS_FAIL:
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

///adding new prdouct at admin side reducer

export const createAdminProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case types.ADMIN_PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case types.ADMIN_PRODUCT_CREATE_FAIL:
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
