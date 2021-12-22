import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.post(
      "${process.env.REACT_APP_API_URL}/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// * Logout User

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};

// * Register User

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const { data } = await fetch("${process.env.REACT_APP_API_URL}/users/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   config,
    // });

    const { data } = await axios.post(
      "${process.env.REACT_APP_API_URL}/users",
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// * Get User Details

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// * Update User Details

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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
      `${process.env.REACT_APP_API_URL}/users/profile`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

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

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

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

    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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
      `${process.env.REACT_APP_API_URL}/users/${user._id}`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
