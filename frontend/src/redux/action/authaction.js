import {
  loginUser,
  registerUser,
  addContact,
  updateUser,
} from "../../api/authApi";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCESS,
} from "../constants";
import { toast } from "react-toastify";

export const register = (userData) => async (dispatch) => {
  try {
    const response = await registerUser(userData);
    const token =
      response.headers["x-auth-token"] || response.headers["auth-token"];
    const userInfo = response.data.user;
    const contact = response.data.contact;

    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("contact", JSON.stringify(contact));

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token,
        userInfo,
        contact,
      },
    });

    toast.success(response.data.message || "Registration successful!");
  } catch (error) {
    const errorMessage =
      error.data?.message || "Registration failed. Please try again.";
    dispatch({
      type: REGISTER_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await loginUser(userData);
    const token =
      response.headers["x-auth-token"] || response.headers["auth-token"];
    const userInfo = response.data.user;
    const contact = response.data.contact;
    console.log(contact);

    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("contact", JSON.stringify(contact));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        userInfo,
        contact,
      },
    });

    toast.success(response.data.message || "Login successful!");
  } catch (error) {
    const errorMessage =
      error.data?.message || "Login failed. Please try again.";
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const Contact = (contactData) => async (dispatch) => {
  try {
    const response = await addContact(contactData);
    dispatch({
      type: ADD_CONTACT_SUCCESS,
      payload: contactData.email,
    });
    toast.success(response.data.message || "Contact Added successfully!");
  } catch (error) {
    const errorMessage =
      error.data?.message || "Contact not get added. Please try again.";
    dispatch({
      type: ADD_CONTACT_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const update = (updateData) => async (dispatch) => {
  try {
    const response = await updateUser(updateData);
    const updatedUserInfo = response.data.user;

    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    userInfo = { ...userInfo, ...updatedUserInfo };
    console.log(updatedUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    dispatch({
      type: UPDATE_USER_SUCESS,
      payload: updatedUserInfo,
    });

    toast.success(response.data.message || "User updated successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "User update failed. Please try again.";
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("contact");
  dispatch({ type: LOGOUT_SUCCESS });
};
