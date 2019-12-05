import _ from "lodash";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import getColumnsFromTasks from "./getColumnsFromTasks";
import getTasksFromColumns from "./getTasksFromColumns";

const apiEndpoint = apiUrl + "/v1/tasks/";

function taskUrl(id) {
  return apiEndpoint + id + "/";
}

export function handleGetTasks() {
  return dispatch => {
    dispatch({ type: "GET_TASKS_API_LOAD" });
    http
      .get(apiEndpoint)
      .then(res => {
        const tasks = res.data;
        tasks.map(task => (task.id = String(task.id)));
        dispatch({ type: "GET_TASKS_API_SUCCESS", payload: tasks });
      })
      .catch(error => {
        dispatch({ type: "GET_TASKS_API_FAILURE", payload: error });
      });
  };
}

// prettier-ignore
export function handleChangeTasks(newData) {
  return async (dispatch, getState) => {
    const prevData = getState();
    dispatch({ type: "HANDLE_TASKS_CHANGE", payload: newData });
    const newTasks = getTasksFromColumns(newData)

    for (let i of _.range(newTasks.length)) {
      if (JSON.stringify(newTasks[i]) !== JSON.stringify(prevData.tasks.tasks[i])) {
        const task = {
          name: newTasks[i].name,
          content: newTasks[i].content,
          column: newTasks[i].column,
          order_no: newTasks[i].order_no
        };
        await http
          .put(taskUrl(newTasks[i].id), task)
          .catch(error => {
            dispatch({ type: "GET_TASKS_API_FAILURE", payload: error });
          });
      }
    }
    http
      .get(apiEndpoint)
      .then(res => {
        const tasks = res.data.data.tasks;
        tasks.map(task => (task.id = String(task.id)));
        dispatch({ type: "GET_TASKS_API_SUCCESS", payload: tasks });
      })
      .catch(error => {
        dispatch({ type: "GET_TASKS_API_FAILURE", payload: error });
      });
  };
}

export function handleAddTask(task) {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    await http
      .post(apiEndpoint, task)
      .then(res => console.log("POST success, the new ID: ", res.data.id))
      .catch(error => {
        dispatch({ type: "POST_TASK_FAILURE", payload: error });
      });
    http
      .get(apiEndpoint)
      .then(res => {
        const tasks = res.data;
        tasks.map(task => (task.id = String(task.id)));
        dispatch({ type: "GET_TASKS_API_SUCCESS", payload: tasks });
      })
      .catch(error => {
        dispatch({ type: "GET_TASKS_API_FAILURE", payload: error });
      });
  };
}

export function handleDeleteTask(taskID) {
  return async dispatch => {
    await http
      .delete(taskUrl(taskID))
      .then(() => console.log("DELETE success taskID: ", taskID))
      .catch(error => {
        dispatch({ type: "DELETE_TASK_FAILURE", payload: error });
      });
    http
      .get(apiEndpoint)
      .then(res => {
        const tasks = res.data;
        tasks.map(task => (task.id = String(task.id)));
        dispatch({ type: "GET_TASKS_API_SUCCESS", payload: tasks });
      })
      .catch(error => {
        dispatch({ type: "GET_TASKS_API_FAILURE", payload: error });
      });
  };
}

// prettier-ignore
const initState = {
  tasks: [],
  loading: false,
  loaded: false,
  error: null,
  columns: { 
    column1: { id: "column1", title: "Ważne", taskIds: [] }, 
    column2: { id: "column2", title: "Normalny priorytet", taskIds: [] }, 
    column3: { id: "column3", title: "Później", taskIds: [] }, 
    column4: { id: "column4", title: "Gotowe", taskIds: [] }
  },
  columnOrder: ["column1", "column2", "column3", "column4"]
};

export default function tasksReducer(state = initState, action) {
  switch (action.type) {
    case "GET_TASKS_API_LOAD":
      return {
        ...state,
        loading: true
      };
    case "GET_TASKS_API_SUCCESS": {
      const tasks = action.payload;
      const columns = getColumnsFromTasks(tasks, state);
      return {
        ...state,
        columns,
        tasks,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case "GET_TASKS_API_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      };
    case "HANDLE_TASKS_CHANGE":
      return (state = action.payload);
    case "POST_TASK_FAILURE": {
      alert(action.payload);
      return {
        ...state,
        error: action.payload
      };
    }
    case "DELETE_TASK_FAILURE": {
      alert(action.payload);
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
