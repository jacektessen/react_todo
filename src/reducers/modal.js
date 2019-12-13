import * as actionTypes from "../actions/actionTypes";

const initState = {
  isShown: false,
  taskID: undefined
};

const reducerModal = (state = initState, action) => {
  // console.log("actions", action);
  switch (action.type) {
    case actionTypes.CLOSE_MODAL:
      return { isShown: false, taskID: undefined };
    case actionTypes.SHOW_MODAL:
      return {
        isShown: true,
        taskID: action.payload ? action.payload : undefined
      };
    default:
      return state;
  }
};

export default reducerModal;
