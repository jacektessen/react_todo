export function closeModal() {
  return dispatch => {
    dispatch({ type: "CLOSE_MODAL" });
  };
}

export function showModal(taskID) {
  return dispatch => {
    dispatch({ type: "SHOW_MODAL", payload: taskID });
  };
}

const initState = {
  isShown: false,
  taskID: undefined
};

export default function modalReducer(state = initState, action) {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        isShown: false,
        taskID: undefined
      };
    case "SHOW_MODAL": {
      console.log("showModal payload", action.payload);
      return {
        ...state,
        isShown: true,
        taskID: action.payload ? action.payload : undefined
      };
    }

    default:
      return state;
  }
}
