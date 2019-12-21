import * as actionTypes from "./actionTypes";

export const getSettingsPage = () => {
  return { type: actionTypes.GET_SETTINGS };
};

export const updateSettingsPage = settings => {
  return { type: actionTypes.UPDATE_SETTINGS, payload: settings };
};
