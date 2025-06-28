// src/actions/userActions.js
import axios from "axios";

// Action Types
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      config
    );

    // Simulate role check similar to Login.jsx
    const role = email === "jalani@gmail.com" ? "admin" : "user";

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        ...data,
        role, // Add role to user data
      },
    });

    // Store user info in localStorage for persistence
    localStorage.setItem("userInfo", JSON.stringify({ ...data, role }));
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

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};