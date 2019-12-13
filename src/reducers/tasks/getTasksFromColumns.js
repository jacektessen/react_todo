export default function getTasksFromColumns(newData) {
  const newTasks = [];
  newData.columnOrder.map(column =>
    newData.columns[column].taskIds.map(taskID =>
      newData.tasks.map(task => {
        if (task.id === taskID) {
          task = {
            ...task,
            order_no: newData.columns[column].taskIds.indexOf(taskID),
            column: column
          };
          newTasks.push(task);
        }
      })
    )
  );
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
  return newTasks;
}
