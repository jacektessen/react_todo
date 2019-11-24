import { combineReducers, createStore, applyMiddleware } from "redux";
import getTasksAPIReducer from "./tasks";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tasks: getTasksAPIReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log("store przed subscribe", store);
store.subscribe(() => {
  console.log("store", store.getState());
});
export default store;
