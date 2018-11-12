import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile(); // when log out the profile is set back to null
    this.props.logOut();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item text-white">
          <Link className="nav-link" to="/posts">
            POST
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            DASHBOARD
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#!"
            onClick={this.onLogoutClick.bind(this)}
          >
            <span style={{ padding: 5 }}>Log Out</span>{" "}
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="You must have a gravatar connected to your email to display the image"
              style={{ width: 25, marginRight: 5 }}
            />
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 gradient">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OUTTHERE !
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Profiles
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authorization
});

export default connect(
  mapStateToProps,
  { logOut, clearCurrentProfile }
)(Navbar);
