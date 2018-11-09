// register
import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";
// this function returns dispatch, thanks thunk dispatch sends asinc requests

export const registerUser = (userData, history) => dispatch => {
  // this route begins from the proxy defined in package.json
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch(
        // ajax request
        {
          type: GET_ERRORS, // the . errors after data is the objec sent as response
          payload: err.response.data.errors
        }
      )
    );
  //for every res.state(40 whatever) comes all from response back, custom errors if hit!!!
};

//logi and get the token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData) // userData is req.body
    .then(res => {
      // save to lovcal Storage
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to authorisation header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      //this get sent and the auth redcer will accept the type
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log out
export const logOut = () => dispatch => {
  // first remove the token from local storage
  localStorage.removeItem("jwtToken");
  //remve the auth header for futute requests
  setAuthToken(false); // the custom function sets it as token if there is, if condition is false  then delete it.
  //set current user to {} which will also set is authenticated to false
  dispatch(setCurrentUser({})); // like this the payload will be empty then isValid turns false
};
