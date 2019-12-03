import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/profile/";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
