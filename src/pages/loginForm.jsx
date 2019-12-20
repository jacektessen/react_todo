import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { connect } from "react-redux";
import { login } from "../actions/user";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    const { data } = this.state;
    this.props.login(data.username, data.password);
  };

  render() {
    // prettier-ignore
    return (
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        
        <div className="login_demo_data">
          <p>
            You can use the following data: <br />
            Username: user-demo@gmail.com<br />
            Password: 123456
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
