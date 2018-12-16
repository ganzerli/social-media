import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
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
    const { thePostId } = this.props;
    //console.log("this is what will be sent", thePostId);
    const comment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.setState({ errors: {} });
    this.props.addComment(thePostId, comment);
    this.setState({ text: "" }); // just clear up the text
  }

  render() {
    let errors = "";
    if (this.state.errors && this.state.errors.errors) {
      errors = this.state.errors.errors;
    }

    return (
      <>
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header gradient-background text-secondary">
              LEAVE YOUR COMMENT
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextAreaFieldGroup
                  placeholder="Reply"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors}
                />
                <button type="submit" className="btn btn-dark">
                  send your comment !
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
  auth: state.authorization,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
});

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
