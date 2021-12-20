import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_ORDERS_FAIL,
  ORDER_LIST_MY_ORDERS_REQUEST,
  ORDER_LIST_MY_ORDERS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

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

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

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

    const { data } = await axios.patch(
      `http://localhost:5000/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_ORDERS_REQUEST });

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

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/myOrders`,
      config
    );

    dispatch({ type: ORDER_LIST_MY_ORDERS_SUCCESS, payload: data });

    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
