import { put, call, takeEvery, select, delay } from "redux-saga/effects";
import http from "../services/settingsHttpService";
import * as actionTypes from "../actions/actionTypes";

function* getSettingsSaga() {
  try {
    const settings = yield call(http.get);
    yield put({ type: actionTypes.GET_SETTINGS_SUCCESS, payload: settings });
  } catch (ex) {
    yield put({ type: actionTypes.GET_SETTINGS_FAILURE, payload: ex });
  }
}

function* updateSettingsSaga(action) {
  try {
    yield call(http.put, action.payload);
  } catch (ex) {
    yield put({ type: actionTypes.UPDATE_SETTINGS_FAILURE, payload: ex });
  }
  yield put({ type: actionTypes.GET_SETTINGS });
}

function* postDefaultSettings() {
  const state = yield select();
  try {
    yield call(http.post, { user: state.currentUser.user.user_id });
  } catch (ex) {
    yield put({ type: actionTypes.POST_DEFAULT_SETTINGS_FAILURE, payload: ex });
  }
  yield delay(1000);
  yield call(getSettingsSaga);
  yield put({ type: actionTypes.REGISTER_USER_SUCCESS });
}

export default function* watchSettings() {
  yield takeEvery(actionTypes.GET_SETTINGS, getSettingsSaga);
  yield takeEvery(actionTypes.UPDATE_SETTINGS, updateSettingsSaga);
  yield takeEvery(actionTypes.POST_DEFAULT_SETTINGS, postDefaultSettings);
}
