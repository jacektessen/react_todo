import _ from "lodash";
import http from "../services/tasksHttpService";
import { put, call, takeEvery, select, fork } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import getTasksFromColumns from "../reducers/tasks/getTasksFromColumns";

function* getTasksApiSaga() {
  yield put({ type: actionTypes.GET_TASKS_API_LOAD });
  try {
    const tasks = yield call(http.get);
    yield put({ type: actionTypes.GET_TASKS_API_SUCCESS, payload: tasks });
  } catch (ex) {
    yield put({ type: actionTypes.GET_TASKS_API_FAILURE, payload: ex });
  }
}

function* postUpdatedTasksSaga(action) {
  const prevData = yield select();
  const newTasks = yield call(getTasksFromColumns, action.payload);
  yield put({ type: actionTypes.POST_UPDATED_STORE, payload: action.payload });
  for (let i of _.range(newTasks.length)) {
    if (JSON.stringify(newTasks[i]) !== JSON.stringify(prevData.tasks.tasks[i])) {
      const task = yield {
        name: newTasks[i].name,
        content: newTasks[i].content,
        column: newTasks[i].column,
        order_no: newTasks[i].order_no
      };
      try {
        yield call(http.put, newTasks[i].id, task);
      } catch (ex) {
        yield put({ type: actionTypes.POST_TASK_FAILURE, payload: ex });
      }
    }
  }
  yield put({ type: actionTypes.GET_TASKS_API });
}

function* postNewTaskSaga(action) {
  try {
    yield call(http.post, action.payload);
  } catch (ex) {
    yield put({ type: actionTypes.POST_TASK_FAILURE, payload: ex });
  }
  yield put({ type: actionTypes.GET_TASKS_API });
}

function* deleteTaskSaga(action) {
  try {
    yield call(http.delete, action.payload);
  } catch (ex) {
    yield put({ type: actionTypes.DELETE_TASK_FAILURE, payload: ex });
  }
  yield put({ type: actionTypes.GET_TASKS_API });
}

export default function* watchTasks() {
  yield takeEvery(actionTypes.GET_TASKS_API, getTasksApiSaga);
  yield takeEvery(actionTypes.POST_UPDATED_TASK, postUpdatedTasksSaga);
  yield takeEvery(actionTypes.POST_NEW_TASK, postNewTaskSaga);
  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskSaga);
}
