import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
  loading: false,
  data: null,
  errors: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DIETARY_PROFILE_STARTED:
    case actionTypes.UPDATE_DIETARY_PROFILE_STARTED:
      return {...state, loading: true};
    case actionTypes.FETCH_DIETARY_PROFILE_FAILURE:
    case actionTypes.UPDATE_DIETARY_PROFILE_FAILURE:
      return {...state, loading: false, errors: action.payload};
    case actionTypes.FETCH_DIETARY_PROFILE_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case actionTypes.UPDATE_DIETARY_PROFILE_SUCCESS:
      // We simple update the original profile with the new fields
      return {...state, loading: false, data: {...state.data, ...action.payload}};
    default:
      return state;
  }
}

/**
 * Used by the reducers/index.js to hold all the fetching functions for updating state in
 * components.
 */

export const getDietaryProfile = (state) => {
  if (!state || !state.data) {
    throw new Error("No Dietary Profile data found. Is user signed in?")
  }
  return state.data;
};

export const isLoading = (state) => {
  if (!state) {
    throw new Error("No Dietary Profile data found.")
  }
  return state.loading;
};

export const getErrors = (state) => {
  if (!state) {
    throw new Error("No Dietary Profile data found.")
  } else if (!state.errors) {
    return null;
  }
  return state.errors.message;
};
