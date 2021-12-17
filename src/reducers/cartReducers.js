import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cart) => cart.product === item.product
      );

      console.log(existingItem);

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
