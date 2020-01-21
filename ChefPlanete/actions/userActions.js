import actionTypes from "./actionTypes";

import { signIn, register } from "../services/user";
import { fetchDietaryProfile } from "./dietaryProfileActions";

export const signInUser = (user) => (dispatch) => {
  dispatch({
    type: actionTypes.USER_SIGN_IN_STARTED,
  });
  return signIn(user.idToken).then((response) => {
    dispatch({
      type: actionTypes.USER_SIGN_IN_SUCCESS,
      payload: {
        ...user,
        authToken: response.token,
      },
    });
  }).catch((error) => {
    dispatch({
      type: actionTypes.USER_SIGN_IN_FAILURE,
      payload: error,
    });
  }).finally(() => {
    dispatch({
      type: actionTypes.USER_SIGN_IN_ENDED,
    });
    fetchDietaryProfile()(dispatch);
  });
};
