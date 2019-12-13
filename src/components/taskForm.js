import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import axios from "axios";
import config from "../config.json";
import { connect } from "react-redux";
import {
  handleAddTask,
  handleChangeTasks,
  handleGetTasks
} from "../actions/tasks";
import { closeModal } from "../actions/modal";

class TaskForm extends Form {
  state = {
    data: {
      column: "",
      content: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    column: Joi.string()
      .required()
      .label("Column"),
    content: Joi.string()
      .required()
      .label("Content"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  componentDidMount() {
    if (this.props.modal.taskID) {
      const taskID = this.props.modal.taskID;
      axios.get(config.apiUrl + `/v2/tasks/${taskID}`).then(res => {
        this.setState({
          data: {
            column: res.data.task.column,
            content: res.data.task.content,
            name: res.data.task.name
          }
        });
      });
    }
  }

  putTaskIdsInColumns = () => {
    const taskID = this.props.modal.taskID;
    const columns = { ...this.props.tasks.columns };
    this.props.tasks.columnOrder.map(column => {
      if (columns[column].taskIds.includes(taskID)) {
        if (column !== this.state.data.column) {
          columns[column].taskIds = columns[column].taskIds.filter(item => {
            if (item !== taskID) return item;
          });
          columns[this.state.data.column].taskIds.push(taskID);
        }
      }
    });
    return columns;
  };

  prepareNewData = () => {
    const columns = this.putTaskIdsInColumns();
    const taskID = this.props.modal.taskID;
    const newData = {
      ...this.props.tasks,
      tasks: this.props.tasks.tasks.map(task =>
        task.id === taskID
          ? {
              ...task,
              name: this.state.data.name,
              content: this.state.data.content,
              column: this.state.data.column
            }
          : task
      ),
      columns: columns
    };
    return newData;
  };

  doSubmit = () => {
    if (this.props.modal.taskID) {
      this.props.handleChangeTasks(this.prepareNewData());
      this.props.closeModal();
      return;
    }
    this.props.handleAddTask(this.state.data);
    this.props.closeModal();
  };

  // prettier-ignore
  render() {
    return (
      <div>
        <h1>Task Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("column", "Column", this.props.tasks.columns )}
          {this.renderInput("name", "Name")}
          {this.renderInput("content", "Content", "textarea")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetTasks: () => dispatch(handleGetTasks()),
    handleChangeTasks: newData => dispatch(handleChangeTasks(newData)),
    handleAddTask: task => dispatch(handleAddTask(task)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
