import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import TaskDetails from "./components/common/taskDetails";
import NotFound from "./components/common/notFound";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/tasks/:code" component={TaskDetails} />
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