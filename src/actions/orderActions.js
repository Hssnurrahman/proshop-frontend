import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    // const { data } = await fetch("http://localhost:5000/api/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.post(
      `http://localhost:5000/api/orders`,
      order,
      config
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
