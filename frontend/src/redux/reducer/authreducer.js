import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  UPDATE_USER_SUCESS,
  UPDATE_USER_FAIL,
} from "../constants";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  userinfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  contact: JSON.parse(localStorage.getItem("contact")) || [],
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log(action.payload.userInfo);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        userinfo: action.payload.userInfo,
        contact: action.payload.contact,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_SUCESS:
      return {
        ...state,
        userinfo: action.payload,
        loading: false,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ADD_CONTACT_SUCCESS:
      let contact = JSON.parse(localStorage.getItem("contact")) || [];
      contact = [...contact, action.payload];
      localStorage.setItem("contact", JSON.stringify(contact));
      return {
        ...state,
        contact: [...state.contact, action.payload],
        loading: false,
      };

    case ADD_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        userinfo: null,
        contact: [],
      };

    default:
      return state;
  }
};

export default authReducer;
