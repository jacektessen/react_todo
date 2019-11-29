import { combineReducers, createStore, applyMiddleware } from "redux";
import tasksReducer from "./tasks";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log("store", store.getState());
});
export default store;
