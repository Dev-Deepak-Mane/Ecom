import * as types from "./actionTypes";
///user login/register/getprofile reducer
export const userReducer = (state = { isAuth: false, user: {} }, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
    case types.USER_REGISTER_REQUEST:
    case types.USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        isAuth: false,
      };
    case types.USER_LOGIN_SUCCESS:
    case types.USER_REGISTER_SUCCESS:
    case types.USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
      };

    case types.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
      };
    case types.USER_LOGIN_FAIL:
    case types.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case types.USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case types.USER_LOGOUT_FAIL:
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

/////update profile reducer
export const updateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
    case types.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case types.UPDATE_PROFILE_FAIL:
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_PROFILE_RESET:
    case types.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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
