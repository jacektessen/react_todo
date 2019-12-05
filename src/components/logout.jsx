import React, { Component } from "react";
import { logout } from "../redux/user";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default connect(null, { logout })(Logout);
