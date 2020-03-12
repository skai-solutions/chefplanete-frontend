import actionTypes from "../actions/actionTypes";

const DEFAULT_STATE = {
  loading: false,
  data: null,
  errors: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_RECIPES_STARTED:
      return { ...state, loading: true };
    case actionTypes.SEARCH_RECIPES_FAILURE:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.SEARCH_RECIPES_SUCCESS:
      return {...state, loading: false, data: action.payload };
    default:
      return state;

  }
}

export const getRecipesByKeywords = (state) => {
  if( !state || !state.data) {
    throw new Error("No Recipes Found.")
  }
  return state.data;
};

export const isLoading = (state) => {
  if (!state) {
    throw new Error("No Recipes data found.")
  }
  return state.loading;
};

export const getErrors = (state) => {
  if (!state) {
    throw new Error("No Recipes data found.")
  } else if (!state.errors) {
    return null;
  }
  return state.errors.message;
};
