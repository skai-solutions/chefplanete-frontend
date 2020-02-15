import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
  loading: false,
  data: [],
  errors: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEEKLY_GOALS_STARTED:
    case actionTypes.CREATE_NEW_WEEKLY_GOAL_STARTED:
    case actionTypes.UPDATE_GOAL_BY_ID_STARTED:
    case actionTypes.COMPLETE_GOAL_BY_ID_STARTED:
    case actionTypes.RESET_GOALS_STARTED:
    case actionTypes.DELETE_GOAL_BY_ID_STARTED:
      return {...state, loading: true};
    case actionTypes.FETCH_WEEKLY_GOALS_FAILURE:
    case actionTypes.CREATE_NEW_WEEKLY_GOAL_FAILURE:
    case actionTypes.UPDATE_GOAL_BY_ID_FAILURE:
    case actionTypes.COMPLETE_GOAL_BY_ID_FAILURE:
    case actionTypes.RESET_GOALS_FAILURE:
    case actionTypes.DELETE_GOAL_BY_ID_FAILURE:
      return {...state, loading: false, errors: action.payload};
    case actionTypes.FETCH_WEEKLY_GOALS_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case actionTypes.CREATE_NEW_WEEKLY_GOAL_SUCCESS:
      return {...state, loading: false, data: [...state.data, action.payload]};
    case actionTypes.UPDATE_GOAL_BY_ID_SUCCESS:
      return {...state, loading: false, data: state.data.map(
        goal => goal.goalId === action.payload.goalId ? action.payload : goal
      )};
    case actionTypes.COMPLETE_GOAL_BY_ID_SUCCESS:
      return {...state, loading: false, data: state.data.map(
        goal => goal.goalId === action.payload ? {...goal, complete: true} : goal
      )};
    case actionTypes.RESET_GOALS_SUCCESS:
      return {...state, loading: false, data: []};
    case actionTypes.DELETE_GOAL_BY_ID_SUCCESS:
      return {...state, loading: false, data: state.data.filter(goal => goal.goalId !== action.payload)};
    default:
      return state;
  }
}

/**
 * Used by the reducers/index.js to hold all the fetching functions for updating state in
 * components.
 */

export const getGoals = (state) => {
  if (!state || !state.data) {
    throw new Error("No Weekly Goals data found. Is user signed in?")
  }
  return state.data;
};

export const isLoading = (state) => {
  if (!state) {
    throw new Error("No Weekly Goals data found.")
  }
  return state.loading;
};

export const getErrors = (state) => {
  if (!state) {
    throw new Error("No Weekly Goals data found.")
  } else if (!state.errors) {
    return null;
  }
  return state.errors.message;
};
