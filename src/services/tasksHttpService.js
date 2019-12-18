import axios from "axios";
import { apiUrl } from "../config.json";
import { connect } from "react-redux";

const apiEndpointV1 = apiUrl + "/v1/tasks/";
const apiEndpointV2 = apiUrl + "/v2/tasks/";

function taskUrl(id) {
  return apiEndpointV1 + id + "/";
}

async function getTasks() {
  const { data } = await axios.get(apiEndpointV2);
  const tasks = data.data.tasks;
  tasks.map(task => (task.id = String(task.id)));
  return tasks;
}

async function putTask(taskID, task) {
  return axios.put(taskUrl(taskID), task);
}

async function postTask(task) {
  return axios.post(apiEndpointV1, task);
}

async function deleteTask(taskID) {
  return axios.delete(taskUrl(taskID));
}

export default {
  get: getTasks,
  post: postTask,
  put: putTask,
  delete: deleteTask
};
