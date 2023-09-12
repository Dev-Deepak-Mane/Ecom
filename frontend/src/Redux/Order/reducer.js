import * as types from "./actionTypes";
///user create new order reducer
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case types.CREATE_ORDER_FAIL:
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

/// user get all orders list reducer
export const myOrdersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.MY_ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.MY_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case types.MY_ORDERS_LIST_FAIL:
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

/// get perticular Order Details reducer

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case types.MY_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.MY_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case types.MY_ORDER_DETAILS_FAIL:
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
