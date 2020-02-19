// This file is for holding commonly used methods which the services use

import store from '../store';
import ENV from '../variables';

export const getApiUrl = () => `${ENV.apiUrl}/api`;

export const getBaseUrl = () => `${ENV.apiUrl}`;

export const getAuthorizationToken = () => {
  const state = store.getState();
  const user = state.user;
  return !user ? null : user.data.authToken;
};

export const getCurrentUserId = () => {
  const state = store.getState();
  const user = state.user;
  return !user ? null : user.data.id;
};

export const handleError = (response) => {
  if (response.ok) {
    return response;
  }
  return response.json().then(error => Promise.reject(error));
};

export const pullOutJson = (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return Promise.reject(new TypeError('Oops, we haven\'t got JSON!'));
};


