import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(newProps) {
    // basically when the state changes gets updated props
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth; // current logged in user
    const post = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(post);
    this.setState({ text: "" }); // just clear up the text
  }

  render() {
    const { errors } = this.props.errors;
    return (
      <>
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">
              Let know about something Special!
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextAreaFieldGroup
                  placeholder="Post something to the world"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors}
                />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.authorization
});

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
