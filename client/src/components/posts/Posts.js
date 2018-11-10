import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";

import { getPosts } from "../../actions/postActions";
import PostForm from "./PostForm";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let content;

    if (posts === null) {
      content = <h1> ... No Posts Found ... </h1>;
    } else if (loading) {
      content = <Spinner />;
    } else {
      content = "a bucnh of posts"; //post feed;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ post: state.post });

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
