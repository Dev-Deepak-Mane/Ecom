import * as actionTypes from "./actionTypes";

const initialState = "";

const stripeApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STRIPE_API_KEY:
      return action.payload;
    case actionTypes.FETCH_STRIPE_API_KEY_FAILURE:
      return "";
    default:
      return state;
  }
};

export default stripeApiKeyReducer;
