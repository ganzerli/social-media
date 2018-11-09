import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {} // this user object is filled with the payload
  // and the reducer updates this state
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // check also if the payload has token
        user: action.payload
      };
    default:
      return state;
  }
}
