import * as types from "./actionTypes";
///get all user list at admin side
export const adminUsersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case types.ADMIN_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case types.ADMIN_ALL_USERS_FAIL:
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
export const adminuserUpdateAndDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_USER_UPDATE_REQUEST:
    case types.ADMIN_USER_DELETE_FAIL:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_USER_UPDATE_SUCCESS:
    case types.ADMIN_USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case types.ADMIN_USER_UPDATE_FAIL:
    case types.ADMIN_USER_DELETE_FAIL:
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

///get single user details at admin side
export const adminUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.ADMIN_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADMIN_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.ADMIN_USER_DETAILS_FAIL:
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
