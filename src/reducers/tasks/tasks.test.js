import reducerTasks, { initState } from ".";
import * as actionTypes from "../../actions/actionTypes";

const tasks = [
  { id: "10", name: "Task 5", content: "Task 5", column: "column1", order_no: 0 },
  { id: "11", name: "Task 11", content: "Task 11", column: "column1", order_no: 1 }
];

const column1 = { id: "column1", title: "Important", taskIds: ["10", "11"] };

describe("tasks reducer", () => {
  it("GET_TASKS_API_SUCCESS - should fill in the tasks array", () => {
    expect(
      reducerTasks(undefined, {
        type: actionTypes.GET_TASKS_API_SUCCESS,
        payload: tasks
      })
    ).toEqual({
      ...initState,
      tasks,
      columns: {
        ...initState.columns,
        column1
      },
      loaded: true
    });
  });
});
