import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class OnePost extends React.Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
    //sends delete request with post id, if the same id of the post is the req.user.id sends back the payload and get called get posts, so the array of post in the state get updated
  }
  onLike(id) {
    this.props.addLike(id);
  }
  onUnlike(id) {
    this.props.removeLike(id);
  }
  findUserLiked(likesArray) {
    const { auth } = this.props;
    for (let i in likesArray) {
      if (likesArray[i].user === auth.user.id) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { post, auth, key, showButtons } = this.props;
    // post comes as prof from the parent component who maps throught the array of profiles and returns directly all this stuff for every post
    if (post.name === "name name")
      post.avatar =
        "https://www.gravatar.com/avatar/b7408665c4be7e56d084c32eddd1de3d?s=200";
    let theButtons = (
      <>
        <button
          type="button"
          className="btn btn-light mr-1"
          onClick={this.onLike.bind(this, post._id)}
        >
          <i
            className={classnames("fas fa-thumbs-up", {
              "text-success": this.findUserLiked(post.likes),
              "text-warning": !this.findUserLiked(post.likes)
            })}
          />
          <span className="badge badge-light">{post.likes.length}</span>
        </button>
        <button
          type="button"
          className="btn btn-light mr-1 turned"
          onClick={this.onUnlike.bind(this, post._id)}
        >
          <i className="text-secondary fas fa-thumbs-down" />
        </button>
        <Link
          to={`/post/${post._id}`}
          className="btn bg-secondary text-light mr-1"
        >
          <b>Comment</b>
        </Link>

        {auth.user.id === post.user ? (
          <button
            type="button"
            className="btn btn-danger mr-1"
            onClick={this.onDeleteClick.bind(this, post._id)}
          >
            <i className="fas fa-times" />
          </button>
        ) : null}
      </>
    );
    if (showButtons === false) {
      theButtons = <></>;
    }
    return (
      <div className="card card-body mb-3" key={"superkey" + key}>
        <div className="row">
          <div className="col-md-3 text-center">
            <a href="profile.html">
              <img
                className="rounded-circle d-md-block"
                src={post.avatar}
                alt="profile image"
                style={{ maxWidth: 100, display: "block", margin: "auto" }}
              />
            </a>
            <span className="text-left m-auto">
              <b>{post.name}</b>
            </span>
          </div>
          <div className="col-md-9">
            <p className="lead">{post.text}</p>

            {theButtons}
          </div>
        </div>
      </div>
    );
  }
}

OnePost.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authorization
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(OnePost);
