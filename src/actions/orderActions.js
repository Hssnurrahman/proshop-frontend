import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_ORDERS_FAIL,
  ORDER_LIST_MY_ORDERS_REQUEST,
  ORDER_LIST_MY_ORDERS_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
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

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/orders`,
      order,
      config
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
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

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
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

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
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

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/myOrders`,
      config
    );

    dispatch({ type: ORDER_LIST_MY_ORDERS_SUCCESS, payload: data });
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

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders`,
      config
    );

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
