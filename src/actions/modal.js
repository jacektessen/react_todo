import * as actionTypes from "./actionTypes";

export function closeModal() {
  return { type: actionTypes.CLOSE_MODAL };
}

export function showModal(taskID) {
  return { type: actionTypes.SHOW_MODAL, payload: taskID };
}
