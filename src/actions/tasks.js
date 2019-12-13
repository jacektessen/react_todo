import * as actionTypes from "./actionTypes";

export const handleGetTasks = () => {
  return { type: actionTypes.GET_TASKS_API };
};

export const handleChangeTasks = newData => {
  return { type: actionTypes.POST_UPDATED_TASK, payload: newData };
};

export const handleAddTask = task => {
  return { type: actionTypes.POST_NEW_TASK, payload: task };
};

export const handleDeleteTask = taskID => {
  return { type: actionTypes.DELETE_TASK, payload: taskID };
};
