import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../../components/common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      err: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    //we submit and if this prop is there
    if (nextProps.auth.isAuthenticated) {
      // just redirect
      this.props.history.push("/dashboard");
    }

    if (nextProps.err) {
      this.setState({ err: nextProps.err });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user); // get called and axios takes the datas
    //if all is ok the token is set as header translated and sent as payload,
    //the auth reducer takes the type and payload, if there is a payload sets isValid true
    //the payload in the reducer get tored in user:{}
  }

  render() {
    const { err } = this.state;

    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center glow">Log In</h1>
                <p className="lead text-center">
                  Sign in to your OUTTHERE account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    name="email"
                    type="email"
                    placeholder="insert your email"
                    onChange={this.onChange}
                    error={this.state.err.email}
                  />
                  <TextFieldGroup
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={this.onChange}
                    error={this.state.err.password}
                  />

                  <input
                    type="submit"
                    className="btn btn-outline-success btn-block mt-4"
                    value="LOGIN INTO YOUR ACCOUNT"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authorization,
  err: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
