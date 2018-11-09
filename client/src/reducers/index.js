import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errReducer from "./errReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  authorization: authReducer,
  errors: errReducer,
  profile: profileReducer
});
