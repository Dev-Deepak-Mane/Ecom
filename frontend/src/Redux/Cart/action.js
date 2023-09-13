import axios from "axios";
import * as types from "./actionTypes";

/// add cart Item
export const addToCart =
  (toast, id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`
    );

    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity: quantity,
      },
    });

    toast({
      title: "Item Added to Cart.",
      description: ``,
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    dispatch(clearErrors());
  };

// remove cart item
export const removeCartItem = (toast, id) => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_CART_ITEM, payload: id });
  toast({
    title: "Item Removed from Cart.",
    description: ``,
    status: "warning",
    duration: 4000,
    isClosable: true,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  dispatch(clearErrors());
};
export const CartList = (store) => store.cart;
export const clearErrors = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

// save shipping info
export const saveShippingInfo = (toast, data) => (dispatch) => {
  dispatch({ type: types.SAVE_SHIPPING_INFO, payload: data });
  toast({
    title: "Shipping Details Saved.",
    description: ``,
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
