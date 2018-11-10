import { ADD_POST, GET_POSTS, POSTS_LOADING } from "../actions/types";

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
    default:
      return state;
  }
}
