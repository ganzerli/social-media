import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class OneComment extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 text-center">
            <a href="profile.html">
              <img
                className="rounded-circle d-md-block"
                src={comment.avatar}
                alt=""
                style={{ maxWidth: 90, margin: "auto" }}
              />
            </a>

            <p className="text-center">
              <h5>{comment.name}</h5>
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>

            {auth.user.id === comment.user ? (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

OneComment.PropTypes = {
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isrequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.authorization
});
export default connect(
  mapStateToProps,
  { deleteComment }
)(OneComment);
