import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

export const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        ToDo
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavz"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* prettier-ignore */}
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {user && (
              <NavLink className="nav-item nav-link active" to="/dashboard">Dashboard</NavLink>
          )}
        </div>
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
            </React.Fragment>)}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
              <NavLink className="nav-item nav-link" to="/settings"><i className="fa fa-cog fa-lg" aria-hidden="true"></i></NavLink>
            </React.Fragment>
          )}

        </div>
      </div>
    </nav>
  );
};

export default connect(state => ({ user: state.currentUser.user }), null)(NavBar);
