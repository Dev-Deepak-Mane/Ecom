import axios from "axios";
import * as types from "./actionTypes";

///user login
export const login = (toast, email, password) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/login`;

  dispatch({ type: types.USER_LOGIN_REQUEST });

  try {
    const { data } = await axios.post(
      apiLink,
      {
        email,
        password,
      },

      { withCredentials: true }
    );

    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data.user });
    toast({
      title: `Login Success`,
      description: `Welcome Back! ${data.user?.name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error?.response?.data?.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

/// user register

export const register = (toast, userData) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/register`;
  // const config = {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // };

  dispatch({ type: types.USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post(apiLink, userData, {
      withCredentials: true,
    });

    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: data.user });
    toast({
      title: "Authenticated!",
      description: `SignUp Success`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error.response.data.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error.response.data.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

///Get userProfile if already signup using cookie it will detect
///and get the profile until token expire

export const getProfile = (toast) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/me`;

  dispatch({ type: types.USER_PROFILE_REQUEST });

  try {
    const { data } = await axios.get(apiLink, { withCredentials: true });

    dispatch({ type: types.USER_PROFILE_SUCCESS, payload: data.user });
    if (toast) {
      toast({
        title: `Login Success`,
        description: `Welcome Back! ${data.user?.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.USER_PROFILE_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
    if (toast) {
      toast({
        title: "An error occurred.",
        description: `${error?.response?.data?.message || error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    dispatch(clearErrors());
  }
};

/// logout user
export const logoutUser = (toast) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/logout`;

  try {
    await axios.get(apiLink, { withCredentials: true });

    dispatch({ type: types.USER_LOGOUT_SUCCESS });
    toast({
      title: `Logout Success`,
      description: `See you agian! `,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.USER_LOGOUT_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error?.response?.data?.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

///// update profile
export const updateProfile = (toast, userData) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/me/update`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  dispatch({ type: types.UPDATE_PROFILE_REQUEST });
  // console.log(userData);
  try {
    const { data } = await axios.patch(
      apiLink,
      userData,
      {
        withCredentials: true,
      },
      config
    );

    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: data });
    toast({
      title: "Profile Upated!",
      description: `Your profile has been successfully updated`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.UPDATE_PROFILE_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error?.response?.data?.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};

///// update Password
export const updatePassword = (toast, passwords) => async (dispatch) => {
  let apiLink = `${process.env.REACT_APP_BASE_URL}/password/update`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({ type: types.UPDATE_PASSWORD_REQUEST });

  try {
    const { data } = await axios.put(
      apiLink,
      passwords,
      {
        withCredentials: true,
      },
      config
    );

    dispatch({ type: types.UPDATE_PASSWORD_SUCCESS, payload: data.user });
    toast({
      title: "Profile Upated!",
      description: `Your profile has been successfully updated`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message || error.message,
    });
    toast({
      title: "An error occurred.",
      description: `${error.response.data.message || error.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(clearErrors());
  }
};
//clearing error form state
export const UserDetails = (store) => store.user;
export const UserUpdate = (store) => store.updateprofile;
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};
