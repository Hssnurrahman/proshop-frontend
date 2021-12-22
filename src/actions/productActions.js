import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

export const fetchProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products?keyword=${keyword}&page=${pageNumber}`
      );

      const products = await response.json();

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${id}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

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

    await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

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
      `${process.env.REACT_APP_API_URL}/products`,
      {},
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

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
      `${process.env.REACT_APP_API_URL}/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewProduct = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST });

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

    await axios.post(
      `${process.env.REACT_APP_API_URL}/products/${id}/review`,
      review,
      config
    );

    dispatch({ type: PRODUCT_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/top`);

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
