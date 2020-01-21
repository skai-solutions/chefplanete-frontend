import actionTypes from "../actions/actionTypes";

const DEFAULT_STATE = {
  loading: false,
  data: null,
  errors: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGN_IN_STARTED:
      return { ...state, loading: true };
    case actionTypes.USER_SIGN_IN_FAILURE:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.USER_SIGN_IN_SUCCESS:
      return {...state, loading: false, data: action.payload };
    default:
      return state;
  }
}

/**
 * Used by the reducers/index.js to hold all the fetching functions for updating state in
 * components.
 */

export const getUser = (state) => {
  console.log(state);
  if (!state) {
    throw new Error("No state data found.");
  }
  return state.data;
};

export const isLoading = (state) => {
  if (!state) {
    throw new Error("No state data found.");
  }
  return state.loading;
};

export const getErrors = (state) => {
  if (!state) {
    throw new Error("No state data found.");
  } else if (!state.errors) {
    return null;
  }
  return state.errors.message;
};
