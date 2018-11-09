import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// GET CURRENT PROFILE

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); // asinc request to let know the reducerthe content will be loaded
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {} /// IF THERE IS NO PROFILE THE PROFILE IS AN EMPTY OBJECT
      })
    );
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add experience action
export const addExperiences = (experiencesData, history) => dispatch => {
  axios
    .post("/api/profile/experiences", experiencesData)
    .then(res => history.push("/dashboard"))
    .catch((
      err // our status(404)
    ) =>
      dispatch({
        type: GET_ERRORS, // so we fill the state in the reducer and the component will receive props
        payload: err.response.data
      })
    );
};
// delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experiences/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch((
      err // our status(404)
    ) =>
      dispatch({
        type: GET_ERRORS, // so we fill the state in the reducer and the component will receive props
        payload: err.response.data
      })
    );
};

// add general infos action
export const addInfos = (infosData, history) => dispatch => {
  axios
    .post("/api/profile/infos", infosData)
    .then(res => history.push("/dashboard"))
    .catch((
      err // our status(404)
    ) =>
      dispatch({
        type: GET_ERRORS, // so we fill the state in the reducer and the component will receive props
        payload: err.response.data
      })
    );
};
// delete info
export const deleteInfo = id => dispatch => {
  axios
    .delete(`/api/profile/infos/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch((
      err // our status(404)
    ) =>
      dispatch({
        type: GET_ERRORS, // so we fill the state in the reducer and the component will receive props
        payload: err.response.data
      })
    );
};

//get all profiles
export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading()); // asinc request to let know the reducerthe content will be loaded
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: {} /// IF THERE IS NO PROFILE THE PROFILE IS AN EMPTY OBJECT
      })
    );
};

// send loading action
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// dleete profile
export const deleteAccount = () => dispatch => {
  // dispatch to make axios request
  if (
    window.confirm("are you shure to delete your account? cannot be undone")
  ) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER, // when in the auth reducer the user is {} the user get logget out because isAutenthicated is false
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
