import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/v1/tasks";

function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTasks() {
  return http.get(apiEndpoint);
}

export function getTask(taskId) {
  return http.get(taskUrl(taskId));
}

export function saveTask(task) {
  if (task.id) {
    const body = { ...task };
    delete body.id;
    return http.put(taskUrl(task.id), body);
  }
  return http.post(apiEndpoint, task);
}

export function deleteTask(taskId) {
  return http.delete(taskUrl(taskId));
}
