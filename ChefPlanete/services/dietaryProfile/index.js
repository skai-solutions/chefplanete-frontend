import {
  getApiUrl,
  getAuthorizationToken,
  handleError,
  pullOutJson,
  getCurrentUserId
} from "../index";

export const getDietaryProfile = () => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/profile`), {
    method: "GET",
    headers
  })
    .then(handleError)
    .then(pullOutJson);
};

export const updateDietaryProfile = (updatedProfile) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/profile`), {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedProfile),
  })
    .then(handleError);
};
