import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class OnePost extends React.Component {
  render() {
    const { post, auth, key } = this.props;
    // post comes as prof from the parent component who maps throught the array of profiles and returns directly all this stuff for every post
    if (post.name === "name name")
      post.avatar =
        "https://secure.gravatar.com/avatar/76e9c15052ad099a9054f909175df1d0?s=320";
    return (
      <div className="card card-body mb-3" key={"superkey" + key}>
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="profile image"
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1 turned">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <a href="post.html" className="btn btn-info mr-1">
              Comments
            </a>
            {auth.user.id === post.user ? (
              <button type="button" className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

OnePost.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authorization
});

export default connect(mapStateToProps)(OnePost);
