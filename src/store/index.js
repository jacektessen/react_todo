import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import reducerUser from "../reducers/user";
import reducerTasks from "../reducers/tasks";
import reducerModal from "../reducers/modal";
import reducerSettingsPage from "../reducers/settingsPage";
import watchUser from "../sagas/user";
import watchTasks from "../sagas/tasks";
import watchSettings from "../sagas/settingsPage";

const rootReducer = combineReducers({
  tasks: reducerTasks,
  modal: reducerModal,
  currentUser: reducerUser,
  settingsPage: reducerSettingsPage
});

function* rootSaga() {
  yield all([call(watchUser), call(watchTasks), call(watchSettings)]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  console.log("store", store.getState());
});

export default store;
