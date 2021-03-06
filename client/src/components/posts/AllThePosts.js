import React, { Component } from "react";
import PropTypes from "prop-types";
import OnePost from "./OnePost";

class AllThePosts extends Component {
  render() {
    const { postsArray } = this.props;
    return postsArray.map(singlePost => (
      <OnePost key={singlePost._id} post={singlePost} showButtons={true} />
    ));
  }
}
AllThePosts.propTypes = {
  postsArray: PropTypes.array.isRequired
};
export default AllThePosts;
