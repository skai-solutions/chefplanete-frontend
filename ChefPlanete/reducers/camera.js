import actionTypes from "../actions/actionTypes";

const DEFAULT_STATE = {
  loading: false,
  data: null,
  errors: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.SCANNING_RECEIPT_STARTED:
      return { ...state, loading: true };
    case actionTypes.SCANNING_RECEIPT_FAILURE:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.SCANNING_RECEIPT_SUCCESS:
      return {...state, loading: false, data: action.payload };
    default:
      return state;
  }
}

export const getIngredients = (state) => {
  if (!state || !state.data) {
    throw new Error("No Ingredients data found.")
  }
  return state.data;
};

export const cameraIsLoading = (state) => {
  if (!state) {
    throw new Error("No Ingredients data found.")
  }
  return state.loading;
};

export const getIngredientsErrors = (state) => {
  if (!state) {
    throw new Error("No Ingredients data found.")
  } else if (!state.errors) {
    return null;
  }
  return state.errors.message;
};

