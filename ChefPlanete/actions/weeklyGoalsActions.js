import actionTypes from "./actionTypes";
import { getWeeklyGoals, createNewGoal, updateGoalById, completeGoalById, deleteGoalById, resetAllGoals } from "../services/weeklyGoals";
import { fetchPantry } from "./pantryActions";
import { fetchDietaryProfile } from "./dietaryProfileActions";

export const fetchWeeklyGoals = () => (dispatch) => {
  // Start the action call
  dispatch({
    type: actionTypes.FETCH_WEEKLY_GOALS_STARTED,
  });
  // Handle the successful http request
  return getWeeklyGoals().then(({goals}) => {
    dispatch({
      type: actionTypes.FETCH_WEEKLY_GOALS_SUCCESS,
      payload: goals,
    });
    // Handle the error (if there is one)
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.FETCH_WEEKLY_GOALS_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};

export const createNewWeeklyGoal = (goal) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_NEW_WEEKLY_GOAL_STARTED,
  });
  return createNewGoal(goal).then(() => {
    dispatch({
      type: actionTypes.CREATE_NEW_WEEKLY_GOAL_SUCCESS,
      payload: goal,
    });
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.CREATE_NEW_WEEKLY_GOAL_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};

export const updateWeeklyGoalById = (goal) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_GOAL_BY_ID_STARTED,
  });
  return updateGoalById(goal).then(() => {
    dispatch({
      type: actionTypes.UPDATE_GOAL_BY_ID_SUCCESS,
      payload: goal,
    });
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.UPDATE_GOAL_BY_ID_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};

export const completeWeeklyGoal = (goalId) => (dispatch) => {
  dispatch({
    type: actionTypes.COMPLETE_GOAL_BY_ID_STARTED,
  });
  return completeGoalById(goalId).then(() => {
    dispatch({
      type: actionTypes.COMPLETE_GOAL_BY_ID_SUCCESS,
      payload: goalId,
    });
    fetchDietaryProfile()(dispatch);
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.COMPLETE_GOAL_BY_ID_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};

export const resetAllWeeklyGoals = () => (dispatch) => {
  dispatch({
    type: actionTypes.RESET_GOALS_STARTED,
  });
  return resetAllGoals().then(() => {
    dispatch({
      type: actionTypes.RESET_GOALS_SUCCESS,
    });
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.RESET_GOALS_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};

export const deleteWeeklyGoalById = (goalId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_GOAL_BY_ID_STARTED,
  });
  return deleteGoalById(goalId).then(() => {
    dispatch({
      type: actionTypes.DELETE_GOAL_BY_ID_SUCCESS,
      payload: goalId,
    });
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.DELETE_GOAL_BY_ID_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};
