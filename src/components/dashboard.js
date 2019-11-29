import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { Link } from "react-router-dom";
import { getTasksAPI, handleTasksChange } from ".././redux/tasks";
import { connect } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.tasks.tasks[0]) this.props.getTasksAPI();
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

    const start = this.props.tasks.columns[source.droppableId];
    const finish = this.props.tasks.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.props.tasks,
        columns: {
          ...this.props.tasks.columns,
          [newColumn.id]: newColumn
        }
      };

      this.props.handleTasksChange(newState);
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
      ...this.props.tasks,
      columns: {
        ...this.props.tasks.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.props.handleTasksChange(newState);
  };

  // handleAddTask = () => {
  //   const tasks = { ...this.state.tasks };
  //   tasks.push();
  // };

  render() {
    if (!this.props.tasks.loaded && !this.props.tasks.loading)
      return <h1>Starting...........</h1>;
    if (this.props.tasks.loading) return <h1>Loading.................</h1>;
    if (this.props.tasks.error)
      return (
        <div>
          <h1>............{this.props.tasks.error.message}..............</h1>
        </div>
      );
    const { columns } = this.props.tasks;
    return (
      <React.Fragment>
        <div className="dashboard_whole">
          <div className="row">
            <div className="col-1">
              <h2>TODO</h2>
              <Link to={{ pathname: "/tasks/add", state: { columns } }}>
                <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="col-10">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                  {this.props.tasks.columnOrder.map(columnId => {
                    const column = this.props.tasks.columns[columnId];
                    const tasks = column.taskIds.map(taskId => {
                      const index = this.props.tasks.tasks
                        .map(task => task.id)
                        .indexOf(taskId);
                      return this.props.tasks.tasks[index];
                    });
                    return (
                      <Column key={column.id} column={column} tasks={tasks} />
                    );
                  })}
                </Container>
              </DragDropContext>
            </div>
            <div className="col-1">
              <h2>TODO</h2>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(mapStateToProps, { getTasksAPI, handleTasksChange })(
  Dashboard
);
