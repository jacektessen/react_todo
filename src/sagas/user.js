import { put, call, takeEvery } from "redux-saga/effects";
import jwtDecode from "jwt-decode";
import http from "../services/userHttpService";
import * as actionTypes from "../actions/actionTypes";

function* loginSaga(action) {
  try {
    const jwt = yield call(http.post, {
      email: action.payload.username,
      password: action.payload.password
    });
    yield call(http.setJwt);
    yield put({ type: actionTypes.LOGIN_USER_SUCCESS, payload: jwt });
  } catch (ex) {}
  yield put({ type: actionTypes.GET_CURRENT_USER });
}

function* getCurrentUserSaga() {
  try {
    yield call(http.setJwt);
    const jwt = yield localStorage.getItem("token");
    const user = yield call(jwtDecode, jwt);
    yield put({
      type: actionTypes.GET_CURRENT_USER_SUCCESS,
      payload: { user, jwt }
    });
  } catch (ex) {
    yield put({
      type: actionTypes.GET_CURRENT_USER_FAILURE
    });
  }
}

export default function* watchUser() {
  yield takeEvery(actionTypes.LOGIN_USER, loginSaga);
  yield takeEvery(actionTypes.GET_CURRENT_USER, getCurrentUserSaga);
}
