import axios from "axios";

export function getTasksAPI() {
  return dispatch => {
    dispatch({ type: "GET_TASKS_API_LOAD" });
    axios
      .get("http://localhost:8000/api/v2/tasks/")
      .then(res => {
        const tasks = res.data.data.tasks;
        console.log("Tasks from res", res);
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

// prettier-ignore
const initState = {
  tasks: {},
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

export default function getTasksAPIReducer(state = initState, action) {
  switch (action.type) {
    case "GET_TASKS_API_LOAD":
      return {
        ...state,
        loading: true
      };
    case "GET_TASKS_API_SUCCESS":
      const { columns, columnOrder } = { ...state };
      const tasks = action.payload;
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
      return {
        ...state,
        columns,
        tasks: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    case "GET_TASKS_API_FAILURE":
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      };
    case "HANDLE_TASKS_CHANGE":
      return (state = action.payload);
    default:
      return state;
  }
}
