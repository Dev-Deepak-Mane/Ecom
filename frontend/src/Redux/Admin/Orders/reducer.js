import * as types from "./actionTypes";
///get all Order list at admin side
export const adminOrdersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.ADMIN_ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case types.ADMIN_ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case types.ADMIN_ALL_ORDERS_FAIL:
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

///update or delete from Order list at admin side
export const adminOrderUpdateAndDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_ORDER_UPDATE_REQUEST:
    case types.ADMIN_ORDER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_ORDER_UPDATE_SUCCESS:
    case types.ADMIN_ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case types.ADMIN_ORDER_UPDATE_FAIL:
    case types.ADMIN_ORDER_DELETE_FAIL:
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
