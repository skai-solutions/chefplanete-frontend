import actionTypes from "./actionTypes";

import { getDietaryProfile, updateDietaryProfile } from "../services/dietaryProfile";

export const fetchDietaryProfile = () => (dispatch) => {
  // Start the action call
  dispatch({
    type: actionTypes.FETCH_DIETARY_PROFILE_STARTED,
  });
  // Handle the successful http request
  return getDietaryProfile().then((response) => {
    dispatch({
      type: actionTypes.FETCH_DIETARY_PROFILE_SUCCESS,
      payload: response,
    });
  // Handle the error (if there is one)
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.FETCH_DIETARY_PROFILE_FAILURE,
      payload: error,
    });
  // Handle the ending, regardless of whether success or error
  }).finally(() => {
    dispatch({
      type: actionTypes.FETCH_DIETARY_PROFILE_ENDED,
    });
  });
};

export const updateUserDietaryProfile = (updatedProfile) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_DIETARY_PROFILE_STARTED,
  });
  return updateDietaryProfile(updatedProfile).then(() => {
    dispatch({
      type: actionTypes.UPDATE_DIETARY_PROFILE_SUCCESS,
      payload: updatedProfile,
    }).catch((error) => {
      console.log(error);
      dispatch({
        type: actionTypes.UPDATE_DIETARY_PROFILE_FAILURE,
        payload: error,
      });
    }).finally(() => {
      dispatch({
        type: actionTypes.UPDATE_DIETARY_PROFILE_ENDED,
      });
    });
  })
};
