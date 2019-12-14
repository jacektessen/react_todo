import axios from "axios";
import { apiUrl } from "../config.json";
import { connect } from "react-redux";

const apiEndpoint = apiUrl + "/v1/tasks/";

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

export default {
  get: getTasks,
  post: postTask,
  put: putTask,
  delete: deleteTask
};
