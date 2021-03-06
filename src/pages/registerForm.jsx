import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import Loader from "../components/common/loader";
import { register } from "../actions/user";
import { connect } from "react-redux";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      await this.props.register(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.email;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (this.props.loadingRegister || this.props.userLoading) return <Loader />;
    return (
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username")}
          {this.renderInput("name", "Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
