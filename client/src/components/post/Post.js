import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OnePost from "../posts/OnePost";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import AllTheComments from "./AllTheComments";
import { getPost } from "../../actions/postActions";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    let content = <div>No content</div>;

    if (loading) {
      content = <Spinner />;
    } else if (Object.keys(post).length > 0 && !loading) {
      // when is loaded
      const dPostId = post._id.toString();
      content = (
        <>
          <OnePost post={post} showButtons={false} />
          <CommentForm thePostId={dPostId} />
          <AllTheComments thePostId={dPostId} commentsArray={post.comments} />
        </>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light mb-3">
                Back to posts!
              </Link>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({ post: state.post });
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
