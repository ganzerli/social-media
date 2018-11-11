import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POSTS_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

export const addPost = post => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", post)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id //in the reducer we can delete the post just locally
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Posts
export const getPosts = post => dispatch => {
  dispatch(postsLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch((
      err // normally if no posts are in the collection
    ) =>
      dispatch({
        type: GET_POSTS, //no need specific errors ex for a form
        payload: null
      })
    );
};

//add like
export const addLike = id => dispatch => {
  //Post.like is an array of req.user.id.. , we send the id of the post and the server checks if already liked
  axios
    .post(`api/posts/like/${id}`) //this route just check if the req.user.id is already in [likes]
    .then(res => dispatch(getPosts()))
    // get post just dispatches gets the posts from the db, and send it as payload to the reducer
    .catch(err => {
      dispatch({
        type: GET_ERRORS, // if already liked we should have an error
        payload: err.response.data
      });
    });
};

// remove like
export const removeLike = id => dispatch => {
  //Post.like is an array of req.user.id.. , we send the id of the post and the server checks if already liked
  axios
    .post(`api/posts/unlike/${id}`) //this route just check if the req.user.id is already in [likes]
    .then(res => dispatch(getPosts()))
    // get post just dispatches gets the posts from the db, and send it as payload to the reducer
    .catch(err => {
      dispatch({
        type: GET_ERRORS, // if already liked we should have an error
        payload: err.response.data
      });
    });
};

export const getPost = id => dispatch => {
  dispatch(postsLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data // a single post found by id in Posts
      })
    )
    .catch((
      err // normally if no posts are in the collection
    ) =>
      dispatch({
        type: GET_POST,
        payload: null // no post
      })
    );
};

export const addComment = (id, comment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${id}`, comment)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data // // ...res.json(savedPost));
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data //the text could be empty
      })
    );
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data // // ...res.json(savedPost));
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data //the text could be empty
      })
    );
};

//
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// loading function
export const postsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
