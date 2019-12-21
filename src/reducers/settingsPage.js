import * as actionTypes from "../actions/actionTypes";

const initState = null;

// prettier-ignore
const reducerSettingsPage = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SETTINGS_SUCCESS: return action.payload;
    case actionTypes.GET_SETTINGS_FAILURE: return action.payload;
    case actionTypes.UPDATE_SETTINGS_SUCCESS: return action.payload;
    case actionTypes.UPDATE_SETTINGS_FAILURE: return action.payload;
    default: return state;
  }
}

export default reducerSettingsPage;
