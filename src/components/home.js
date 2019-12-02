import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/dashboard">
          <button className="btn btn-primary">Dashboard</button>
        </Link>
      </div>
    );
  }
}

export default Home;
