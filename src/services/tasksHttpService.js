import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../config.json";
import { connect } from "react-redux";
import { logout } from "../actions/user";

const apiEndpoint = apiUrl + "/v1/tasks/";

function removeExpiredToken(props) {
  console.log("removeExpiredToken w tasks");
  props.logout();
  window.location = "/login";
}

function taskUrl(id) {
  return apiEndpoint + id + "/";
}

async function getTasks() {
  const { data: tasks } = await axios.get(apiEndpoint);
  tasks.map(task => (task.id = String(task.id)));
  return tasks;
}

async function putTask(taskID, task) {
  return axios.put(taskUrl(taskID), task);
}

async function postTask(task) {
  return axios.post(apiEndpoint, task);
}

async function deleteTask(taskID) {
  return axios.delete(taskUrl(taskID));
}

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  if (error.response.status == 401) {
    removeExpiredToken();
  }

  return Promise.reject(error);
});

export default {
  get: getTasks,
  post: postTask,
  put: putTask,
  delete: deleteTask
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

connect(null, mapDispatchToProps)(removeExpiredToken);
