import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndpointV1 = apiUrl + "/v1/settings/";
const apiEndpointV2 = apiUrl + "/v2/settings/";

async function getSettings() {
  const { data } = await axios.get(apiEndpointV2);
  const settings = data.settings;
  return settings;
}

async function putSettings(settings) {
  return axios.put(apiEndpointV1 + settings.id + "/", settings);
}

async function postNewSettings(settings) {
  return axios.post(apiEndpointV1, settings);
}

export default {
  get: getSettings,
  put: putSettings,
  post: postNewSettings
};
