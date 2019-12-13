import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { logout } from "../actions/user";
import { apiUrl } from "../config.json";

const apiEndpointLogging = apiUrl + "/v1/login/";
const apiEndpointRegister = apiUrl + "/v1/profile/";

function removeExpiredToken(props) {
  props.logout();
  window.location = "/login";
}

async function post(loginData) {
  const { data: jwt } = await axios.post(apiEndpointLogging, loginData);
  localStorage.setItem("token", jwt.token);
  return jwt;
}

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }
  console.log("error interceptions", error.response.status);

  if (error.response.status === 401) {
    removeExpiredToken();
  }

  return Promise.reject(error);
});

function setJwt() {
  const jwt = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `JWT ${jwt}`;
}

export default {
  get: axios.get,
  post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

connect(null, { logout })(removeExpiredToken);
