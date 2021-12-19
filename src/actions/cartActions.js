import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:5000/api/products/${id}`);

  const product = await response.json();

  //   console.log(response.json());

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(data));
};