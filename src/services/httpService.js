import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { logout } from "../redux/user";

function removeExpiredToken(props) {
  console.log("401 401 401 401");
  props.logout();
  window.location = "/login";
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
  console.log("authorization");
  const jwt = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `JWT ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

connect(null, { logout })(removeExpiredToken);
