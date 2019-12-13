import * as actionTypes from "../actions/actionTypes";
import jwtDecode from "jwt-decode";
import http from "../services/userHttpService";

const logout = () => {
  console.log("logout uruchomione");
  localStorage.removeItem("token");
  return null;
};

const initState = null;

// prettier-ignore
const reducerUser = (state = initState, action) => {
  // console.log("actions", action);
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_SUCCESS: return action.payload;
    case actionTypes.GET_CURRENT_USER_FAILURE: return null;
    case actionTypes.LOGIN_USER_SUCCESS: return { ...state, jwt: action.payload };
    case actionTypes.LOGIN_USER_FAILURE: return { ...state, error: action.payload };
    case actionTypes.REGISTER_FAILURE: return { ...state, error: action.payload }
    case actionTypes.LOGOUT_USER: return logout();
    default: return state;
  }
};

export default reducerUser;
