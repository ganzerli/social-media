import {
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CLEAR_ERRORS
} from "../actions/types";

const initialState = {}; // object has to be the err obj itself

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // it is an errors object itself, from the action Auth from backend
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
