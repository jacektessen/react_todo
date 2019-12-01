import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import axios from "axios";
import { connect } from "react-redux";
import {
  handleAddTask,
  handleChangeTasks,
  handleGetTasks
} from ".././redux/tasks";
import { conditionalExpression } from "@babel/types";

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
    if (this.props.match.params.code) {
      const taskID = this.props.match.params.code;
      const columns = { ...this.props.tasks.columns };
      this.props.tasks.columnOrder.map(column => {
        if (columns[column].taskIds.includes(taskID)) {
          console.log("log1", columns);
          if (column !== this.state.data.column) {
            console.log("log 2", columns);
            columns[column].taskIds = columns[column].taskIds.filter(item => {
              if (item !== taskID) return item;
            });
            columns[this.state.data.column].taskIds.push(taskID);
          }
        }
      });
      console.log("log 3", columns);
      const newData = {
        ...this.props.tasks,
        tasks: this.props.tasks.tasks.map(task =>
          task.id === this.props.match.params.code
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
      console.log("newData FORM", newData);
      this.props.handleChangeTasks(newData);
      this.props.history.push("/dashboard");
      return;
    }
    this.props.handleAddTask(this.state.data);
    this.props.history.push("/dashboard");
  };

  componentDidMount() {
    console.log("component did mount");
    if (this.props.match.params.code) {
      this.props.handleGetTasks();
      const taskID = this.props.match.params.code;
      axios.get(`http://localhost:8000/api/v2/tasks/${taskID}`).then(res => {
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
    console.log("props in form", this.props)
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
    tasks: state.tasks
  };
};

export default connect(mapStateToProps, {
  handleAddTask,
  handleChangeTasks,
  handleGetTasks
})(TaskForm);
