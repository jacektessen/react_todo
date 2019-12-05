import jwtDecode from "jwt-decode";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpointLogging = apiUrl + "/v1/login/";

const apiEndpointRegister = apiUrl + "/v1/profile/";

http.setJwt();

export function getCurrentUser() {
  return dispatch => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log("User token redux", user);
      dispatch({ type: "GET_CURRENT_USER", payload: [user, jwt] });
    } catch (ex) {}
  };
}

export function login(username, password) {
  return async dispatch => {
    const { data: jwt } = await http.post(apiEndpointLogging, {
      email: username,
      password
    });
    localStorage.setItem("token", jwt.token);
    http.setJwt();
    dispatch({ type: "LOGIN_USER", payload: jwt });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT_USER" });
  };
}

export function register(user) {
  return async dispatch => {
    await http
      .post(apiEndpointRegister, {
        email: user.username,
        password: user.password,
        name: user.name
      })
      .catch(error => {
        alert(error);
      });
    const { data: jwt } = await http.post(apiEndpointLogging, {
      email: user.username,
      password: user.password
    });
    localStorage.setItem("token", jwt.token);
    http.setJwt();
    dispatch({ type: "LOGIN_USER", payload: jwt });
  };
}

const initState = null;

export default function getCurrentUserReducer(state = initState, action) {
  switch (action.type) {
    case "GET_CURRENT_USER":
      return (state = {
        user: action.payload[0],
        jwt: action.payload[1]
      });
    case "LOGIN_USER":
      return (state = {
        ...state,
        jwt: action.payload
      });
    case "LOGOUT_USER":
      return (state = null);
    default:
      return state;
  }
}
