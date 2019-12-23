import { put, call, takeEvery, select } from "redux-saga/effects";
import jwtDecode from "jwt-decode";
import http from "../services/userHttpService";
import * as actionTypes from "../actions/actionTypes";

function* loginSaga(action) {
  try {
    yield put({ type: actionTypes.LOGIN_USER_LOAD });
    const jwt = yield call(http.postLogin, {
      email: action.payload.username,
      password: action.payload.password
    });
    yield call(http.setJwt);
    yield put({ type: actionTypes.LOGIN_USER_SUCCESS, payload: jwt });
  } catch (ex) {
    yield put({ type: actionTypes.LOGIN_USER_FAILURE, payload: ex });
  }
  yield call(getCurrentUserSaga);
}

function* registerUserSaga(action) {
  try {
    yield call(http.postRegister, action.payload);
  } catch (ex) {
    yield put({ type: actionTypes.REGISTER_FAILURE, payload: ex });
  }
  yield call(loginSaga, {
    payload: { username: action.payload.email, password: action.payload.password }
  });
  yield put({ type: actionTypes.POST_DEFAULT_SETTINGS });
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
    yield put({ type: actionTypes.GET_SETTINGS });
  } catch (ex) {
    yield put({
      type: actionTypes.GET_CURRENT_USER_FAILURE,
      payload: ex
    });
  }
}

export default function* watchUser() {
  yield takeEvery(actionTypes.LOGIN_USER, loginSaga);
  yield takeEvery(actionTypes.GET_CURRENT_USER, getCurrentUserSaga);
  yield takeEvery(actionTypes.REGISTER, registerUserSaga);
}
