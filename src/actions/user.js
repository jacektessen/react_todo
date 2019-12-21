import * as actionTypes from "./actionTypes";

export const getCurrentUser = () => {
  return { type: actionTypes.GET_CURRENT_USER };
};

export const login = (username, password) => {
  return { type: actionTypes.LOGIN_USER, payload: { username, password } };
};

export const logout = () => {
  return { type: actionTypes.LOGOUT_USER };
};

export const register = user => {
  return { type: actionTypes.REGISTER, payload: user };
};
