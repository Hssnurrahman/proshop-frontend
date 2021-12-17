import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: [] },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
