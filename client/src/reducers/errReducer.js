import { GET_ERRORS } from "../actions/types";

const initialState = {}; // object has to be the err obj itself

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // it is an errors object itself, from the action Auth from backend

    default:
      return state;
  }
}
