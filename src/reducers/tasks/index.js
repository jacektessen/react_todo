import * as actionTypes from "../../actions/actionTypes";
import getColumnsFromTasks from "./getColumnsFromTasks";

const getTasksApiSuccess = (state, tasks) => {
  const columns = getColumnsFromTasks(tasks, state);
  return {
    ...state,
    columns,
    tasks,
    loading: false,
    // loaded: true,
    error: null
  };
};

const postTaskFailure = (state, error) => {
  alert(error);
  return { ...state, error };
};

const deleteTaskFailure = (state, error) => {
  alert(error);
  return { ...state, error };
};

// prettier-ignore
export const initState = {
  tasks: [],
  loading: false,
  // loaded: false,
  error: null,
  columns: { 
    column1: { id: "column1", title: "Important", taskIds: [] }, 
    column2: { id: "column2", title: "Normal", taskIds: [] }, 
    column3: { id: "column3", title: "Later", taskIds: [] }, 
    column4: { id: "column4", title: "Done", taskIds: [] }
  },
  columnOrder: ["column1", "column2", "column3", "column4"]
};

// prettier-ignore
const reducerTasks = (state = initState, action) => {
  // console.log("actions", action);
  switch (action.type) {
    case actionTypes.GET_TASKS_API_LOAD: return { ...state, loading: true };
    case actionTypes.GET_TASKS_API_SUCCESS: 
      return getTasksApiSuccess(state, action.payload);
    case actionTypes.GET_TASKS_API_FAILURE: 
      return { ...state, loading: false, error: action.payload };
    case actionTypes.POST_UPDATED_STORE: return action.payload;
    case actionTypes.POST_TASK_FAILURE: return postTaskFailure(state, action.payload);
    case actionTypes.DELETE_TASK_FAILURE: return deleteTaskFailure(state, action.payload);
    default: return state;
  }
}

export default reducerTasks;
