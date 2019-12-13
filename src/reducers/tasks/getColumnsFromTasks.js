export default function getColumnsFromTasks(tasks, state) {
  const { columns, columnOrder } = { ...state };
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
