import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import config from "../config.json";
import { connect } from "react-redux";
import {
  handleAddTask,
  handleChangeTasks,
  handleGetTasks
} from ".././redux/tasks";
import { closeModal } from ".././redux/modal";

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

  doSubmit = () => {
    if (this.props.modal.taskID) {
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
      this.props.handleChangeTasks(newData);
      this.props.closeModal();
      return;
    }
    this.props.handleAddTask(this.state.data);
    this.props.closeModal();
  };

  componentDidMount() {
    console.log("component did mount");
    if (this.props.modal.taskID) {
      const taskID = this.props.modal.taskID;
      http.get(config.apiURL + `/api/v2/tasks/${taskID}`).then(res => {
        console.log("res", res);
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

export default connect(mapStateToProps, {
  handleAddTask,
  handleChangeTasks,
  handleGetTasks,
  closeModal
})(TaskForm);
