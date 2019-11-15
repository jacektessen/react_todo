import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Dashboard extends Component {
  state = initialData;

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:8000/api/v2/tasks/");
    const tasks = data.data.tasks;
    tasks.map(task => (task.id = String(task.id)));

    const { columns, columnOrder } = this.state;
    const newColumns = { ...columns };
    columnOrder.map(column =>
      newColumns[column].taskIds.push(
        ...tasks.map(task => (task.column === column ? String(task.id) : null))
      )
    );

    columnOrder.map(column => {
      newColumns[column].taskIds = newColumns[column].taskIds.filter(
        taskId => taskId !== null
      );
    });

    this.setState({ tasks });
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      console.log("New State jedna kolumna", newState);

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <h2>TODO</h2>
          </div>
          <div className="col-8">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Container>
                {this.state.columnOrder.map(columnId => {
                  const column = this.state.columns[columnId];
                  const tasks = column.taskIds.map(taskId => {
                    const index = this.state.tasks
                      .map(task => task.id)
                      .indexOf(taskId);
                    return this.state.tasks[index];
                  });
                  return (
                    <Column key={column.id} column={column} tasks={tasks} />
                  );
                })}
              </Container>
            </DragDropContext>
          </div>
          <div className="col-2">
            <h2>TODO</h2>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
