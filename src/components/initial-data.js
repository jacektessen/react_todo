const initialData = {
  tasks: [
    // { id: "task-1", content: "Take out the garbage" },
    // { id: "task-2", content: "Watch my favorite show" },
    // { id: "task-3", content: "Charge my phone" },
    // { id: "task-4", content: "Cook dinner" }
  ],
  columns: {
    column1: {
      id: "column1",
      title: "Ważne",
      // taskIds: ["task-1", "task-2", "task-3", "task-4"]
      taskIds: []
    },
    column2: {
      id: "column2",
      title: "Normalny priorytet",
      taskIds: []
    },
    column3: {
      id: "column3",
      title: "Później",
      taskIds: []
    },
    column4: {
      id: "column4",
      title: "Gotowe",
      taskIds: []
    }
  },

  columnOrder: ["column1", "column2", "column3", "column4"]
};

export default initialData;
