import axios from "axios";
import { ADD_POST, GET_ERRORS, GET_POSTS, POSTS_LOADING } from "./types";
import Posts from "../components/posts/Posts";

export const addPost = post => dispatch => {
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
    .catch(err =>
      dispatch({
        type: GET_POSTS, //no need specific errors ex for a form
        payload: null
      })
    );
};

// loading function
export const postsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
