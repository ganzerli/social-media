import {
  ADD_POST,
  GET_POSTS,
  POSTS_LOADING,
  DELETE_POST,
  GET_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        post: action.payload
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload, // can be null if there are errors
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
