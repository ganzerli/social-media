import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import { PropTypes } from "prop-types";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // the last .errors is the obj of the backend
  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      // here the prop is taken form the state which is an object with an object from the backend
      this.setState({ errors: nextProps.err });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    //preventing, and creating an obj for user data
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    //user is filled and sent, dispatched to the reducer
    this.props.registerUser(newUser, this.props.history);
    //alloew us to redirect to another page between the action!!
  }

  render() {
    const { errors } = { ...this.state };
    // const errors = this.state.errors;
    console.log(errors);
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 glow text-center">Sign Up</h1>
              <p className="lead text-center ">Create your account !</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  type="name"
                  placeholder="insert your name"
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="insert your email"
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar, using a gravatar email your image will show here"
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder=" password"
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  name="password2"
                  type="password"
                  placeholder="insert your password2"
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  className="btn btn-success btn-block mt-4"
                  value="REGISTER AN ACCOUNT"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // get the infos from a reducer and access it fro this.props
  auth: state.authorization, // authorisation reducer put the state in auth prop
  err: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
