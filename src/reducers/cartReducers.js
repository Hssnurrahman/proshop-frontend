import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cart) => cart.product === item.product
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cart) => {
            return cart.product === existingItem.product ? item : cart;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cart) => cart.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
