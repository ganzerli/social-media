import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

import store from "./store";
import { setCurrentUser, logOut } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import setAuthToken from "./util/setAuthToken";

import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

// check if there is a token
if (localStorage.jwtToken) {
  //set auth header
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // if is full the reducer updates the state
  // same aswith athentication with the form
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logOut());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "./login";
  }
}
// this is needed so that when we log in and refresh tthe page if there is a token in local storage will be decoded and sent to keep the user state also closing the browser and open again

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
