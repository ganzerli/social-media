import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  // return what we would in appjs like the other routes
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

PrivateRoute.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authorization
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
