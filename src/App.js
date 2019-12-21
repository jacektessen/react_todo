import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import SettingsPage from "./pages/settingsPage";
import TaskForm from "./components/taskForm";
import NotFound from "./components/common/notFound";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import { getCurrentUser } from "./actions/user";

export class App extends Component {
  state = { currentUserIsMounted: false };

  componentDidMount() {
    this.props.getCurrentUser();
    this.setState({ currentUserIsMounted: true });
  }
  // prettier-ignore
  render() {
    console.log("props in App", this.props);
    if (!this.state.currentUserIsMounted) return null;
    return (
      <div className={this.props.location.pathname === "/dashboard" ? "app-dashboard" : "app"}>
      <NavBar />
      <ToastContainer />
      <Switch>
      <Route path="/login" exact render={() => this.props.user ? <Redirect to="/dashboard" /> : <LoginForm /> }/>
      <Route path="/register" exact render={() => this.props.user ? <Redirect to="/dashboard" /> : <RegisterForm /> } />
      <Route path="/dashboard" exact render={() => !this.props.user ? <Redirect to="/login" /> : <Dashboard /> } />
      <Route path="/settings" exact render={() => !this.props.user ? <Redirect to="/login" /> : <SettingsPage /> } />
      <Route path="/logout" exact component={Logout} />
      <Route path="/tasks/add" exact component={TaskForm} />
      <Route path="/tasks/:code" exact component={TaskForm} />
      <Route path="/not-found" exact component={NotFound} />
      <Redirect from="/" exact to="/login" />
      <Redirect to="/not-found" />
      </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  };
};

export default connect(
  state => ({ user: state.currentUser }),
  mapDispatchToProps
)(withRouter(App));
