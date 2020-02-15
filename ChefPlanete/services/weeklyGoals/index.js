import {
  getApiUrl,
  getAuthorizationToken,
  handleError,
  pullOutJson,
  getCurrentUserId
} from "../index";

export const getWeeklyGoals = () => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/goals`), {
    method: "GET",
    headers
  })
    .then(handleError)
    .then(pullOutJson);
};

export const createNewGoal = (goal) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/goals`), {
    method: "POST",
    headers,
    body: JSON.stringify(goal),
  })
    .then(handleError);
};

export const updateGoalById = (goalId, updateGoal) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/goals/${goalId}`), {
    method: "PUT",
    headers,
    body: JSON.stringify(updateGoal),
  })
    .then(handleError);
};

export const completeGoalById = (goalId) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/goals/${goalId}`), {
    method: "PATCH",
    headers,
  })
    .then(handleError);
};

export const resetAllGoals = () => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/goals/reset`), {
    method: "PATCH",
    headers,
  })
    .then(handleError);
};

export const deleteGoalById = (goalId) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/goals/${goalId}`), {
    method: "DELETE",
    headers,
  })
    .then(handleError);
};
