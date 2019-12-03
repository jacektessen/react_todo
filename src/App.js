import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import TaskDetails from "./components/taskDetails";
import TaskForm from "./components/taskForm";
import NotFound from "./components/common/notFound";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/tasks/add" exact component={TaskForm} />
          <Route path="/tasks/:code" component={TaskForm} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
