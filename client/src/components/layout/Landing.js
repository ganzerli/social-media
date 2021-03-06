import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">OUTTHERE</h1>
                <p className="lead">
                  {" "}
                  Create your profile, share posts, and know from interesting
                  facts, places, or whatever you like. Share your lifestyle or
                  your experience and find different topics !
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg btn-outline-success mr-2 "
                >
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-outline-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authorization
});

export default connect(
  mapStateToProps,
  {}
)(Landing);
