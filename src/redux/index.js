import { combineReducers, createStore, applyMiddleware } from "redux";
import tasksReducer from "./tasks";
import modalReducer from "./modal";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  modal: modalReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log("store", store.getState());
});
export default store;
