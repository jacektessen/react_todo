import axios from "axios";

export function getTasksAPI() {
  return dispatch => {
    dispatch({ type: "GET_TASKS_API_LOAD" });
    axios
      .get("http://localhost:8000/api/v2/tasks/")
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

export function handleTasksChange(newData) {
  return {
    type: "HANDLE_TASKS_CHANGE",
    payload: newData
  };
}

export function handleAddTask(task) {
  return dispatch => {
    dispatch({ type: "NEW_TASK_LOAD" });
    axios
      .post("http://localhost:8000/api/v1/tasks/", task)
      .then(res =>
        dispatch({
          type: "POST_TASK_SUCCESS",
          payload: res.data
        })
      )
      .catch(error => {
        dispatch({ type: "POST_TASK_FAILURE", payload: error });
      });
  };
}

export function handleDeleteTask(task) {}

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
  const { columns, columnOrder } = {...initState};
  Object.keys(columns).map(key => columns[key].taskIds = []);
  columnOrder.map(column =>
    columns[column].taskIds.push(
      ...tasks.map(task =>
        task.column === column ? String(task.id) : null
      )
    )
  );

  columnOrder.map(column => {
    columns[column].taskIds = columns[column].taskIds.filter(
      taskId => taskId !== null
    );
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
    case "GET_TASKS_API_SUCCESS":{
      const tasks = action.payload;
      const columns = getColumnsFromTasks(tasks);
      return {
        ...state,
        columns,
        tasks,
        loading: false,
        loaded: true,
        error: null
      }};
    case "GET_TASKS_API_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      };
    case "HANDLE_TASKS_CHANGE":
      return (state = action.payload);
    case "NEW_TASK_LOAD":
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case "POST_TASK_SUCCESS":{
      const tasks = [...state.tasks];
      const task = {
        ...action.payload,
        id: String(action.payload.id)
      }
      tasks.push(task);
      const columns = getColumnsFromTasks(tasks);
      return {
        ...state,
        loading: false,
        loaded: true,
        columns,
        tasks
      }};
    case "POST_TASK_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      };
    default:
      return state;
  }
}
