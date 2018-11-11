import React, { Component } from "react";
import PropTypes from "prop-types";
import OneComment from "./OneComment";

class AllTheComments extends Component {
  render() {
    const { commentsArray, thePostId } = this.props;
    return commentsArray.map(singleComment => (
      <OneComment
        key={singleComment._id}
        comment={singleComment}
        postId={thePostId}
      />
    ));
  }
}

AllTheComments.PropTypes = {
  commentsArray: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default AllTheComments;
