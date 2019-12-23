import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/column";
import TaskForm from "../components/taskForm";
import Modal from "../components/common/modal/modal";
import Loader from "../components/common/loader";
import { connect } from "react-redux";
import { handleGetTasks, handleChangeTasks } from "../actions/tasks";
import { showModal } from "../actions/modal";
import { getCurrentUser } from "../actions/user";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.handleGetTasks();
  }

  renderTaskForm = () => {};

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
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

      this.props.handleChangeTasks(newState);
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

    this.props.handleChangeTasks(newState);
  };

  render() {
    console.log("props w dashboard", this.props);
    // if (this.props.tasks.loading) return <Loader />;
    return (
      <React.Fragment>
        <div className="dashboard_whole">
          <div className="row d-flex justify-content-center">
            <button
              className="btn btn-success mt-2 btn-add-dashboard"
              onClick={() => this.props.showModal()}>
              + Add a new task
            </button>
          </div>
          <div className="row">
            <div className="col">
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
                    return <Column key={column.id} column={column} tasks={tasks} />;
                  })}
                </Container>
              </DragDropContext>
            </div>
          </div>
        </div>
        <Modal clickOutside={false}>
          <TaskForm />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetTasks: () => dispatch(handleGetTasks()),
    handleChangeTasks: newData => dispatch(handleChangeTasks(newData)),
    showModal: taskID => dispatch(showModal(taskID)),
    getCurrentUser: () => dispatch(getCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
