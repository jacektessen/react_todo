import React, { Component } from "react";
import { logout } from "../actions/user";
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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
