import _ from "lodash";
import http from "../services/httpService";
import config from "../config.json";

export function handleGetTasks() {
  return dispatch => {
    dispatch({ type: "GET_TASKS_API_LOAD" });
    http
      .get(config.apiUrl + "/v2/tasks/")
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

// prettier-ignore
export function handleChangeTasks(newData) {
  return async (dispatch, getState) => {
    const prevData = getState();
    dispatch({ type: "HANDLE_TASKS_CHANGE", payload: newData });
    const newTasks = [];
    newData.columnOrder.map(column => newData.columns[column].taskIds.map(taskID =>
        newData.tasks.map(task => {
          if (task.id === taskID) {
            task = {
              ...task,
              order_no: newData.columns[column].taskIds.indexOf(taskID),
              column: column
            };
            newTasks.push(task);
          }})));
    newData = {
      ...newData,
      newTasks
    };

    newTasks.sort((a, b) => {
      const taskA = parseInt(a.id);
      const taskB = parseInt(b.id);
      if (taskA < taskB) return -1;
      if (taskA > taskB) return 1;
      return 0;
    });
    for (let i of _.range(newTasks.length)) {
      if (JSON.stringify(newTasks[i]) !== JSON.stringify(prevData.tasks.tasks[i])) {
        const task = {
          name: newTasks[i].name,
          content: newTasks[i].content,
          column: newTasks[i].column,
          order_no: newTasks[i].order_no
        };
        await http
          .put(config.apiUrl + `/v1/tasks/${newTasks[i].id}/`, task)
          .catch(error => {
            dispatch({ type: "GET_TASKS_API_FAILURE", payload: error });
          });
      }
    }
    http
      .get(config.apiUrl + "/v2/tasks/")
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
  return async dispatch => {
    await http
      .post(config.apiUrl + "/v1/tasks/", task)
      .then(res => console.log("POST success, the new ID: ", res.data.id))
      .catch(error => {
        dispatch({ type: "POST_TASK_FAILURE", payload: error });
      });
    http
      .get(config.apiUrl + "/v2/tasks/")
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

export function handleDeleteTask(taskID) {
  return async dispatch => {
    await http
      .delete(config.apiUrl + `/v1/tasks/${taskID}`)
      .then(() => console.log("DELETE success taskID: ", taskID))
      .catch(error => {
        dispatch({ type: "DELETE_TASK_FAILURE", payload: error });
      });
    http
      .get(config.apiUrl + "/v2/tasks/")
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

function getColumnsFromTasks(tasks) {
  const { columns, columnOrder } = { ...initState };
  Object.keys(columns).map(key => (columns[key].taskIds = []));
  columnOrder.map(column =>
    columns[column].taskIds.push(
      ...tasks.map(task =>
        task.column === column
          ? { id: String(task.id), order: task.order_no }
          : null
      )
    )
  );
  columnOrder.map(column => {
    columns[column].taskIds = columns[column].taskIds
      .filter(taskId => taskId !== null)
      .sort((a, b) => {
        const taskA = a.order;
        const taskB = b.order;
        if (taskA < taskB) return -1;
        if (taskA > taskB) return 1;
        return 0;
      })
      .map(task => task.id);
  });

  return columns;
}

export default function tasksReducer(state = initState, action) {
  switch (action.type) {
    case "GET_TASKS_API_LOAD":
      return {
        ...state,
        loading: true
      };
    case "GET_TASKS_API_SUCCESS": {
      const tasks = action.payload;
      const columns = getColumnsFromTasks(tasks);
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
    case "POST_TASK_FAILURE":
      return {
        ...state,
        error: action.payload
      };
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
