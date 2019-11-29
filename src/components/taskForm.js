import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { handleAddTask } from ".././redux/tasks";

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
    this.props.handleAddTask(this.state.data);
    this.props.history.push("/dashboard");
  };
  // prettier-ignore
  render() {
    return (
      <div>
        <h1>Task Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("column", "Column", this.props.location.state.columns)}
          {this.renderInput("name", "Name")}
          {this.renderInput("content", "Content", "textarea")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default connect(null, { handleAddTask })(TaskForm);
