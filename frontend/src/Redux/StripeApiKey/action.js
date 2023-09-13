import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchStripeApiKey = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/stripeapikey`,
        {
          withCredentials: true,
        }
      );
      const apiKey = response.data;

      dispatch(setStripeApiKey(apiKey));
    } catch (error) {
      // Handle error case
      dispatch({
        type: "FETCH_STRIPE_API_KEY_FAILURE",
        payload: error,
      });
    }
  };
};

export const setStripeApiKey = (apiKey) => {
  return {
    type: actionTypes.SET_STRIPE_API_KEY,
    payload: apiKey,
  };
};

// Define other action creators here
