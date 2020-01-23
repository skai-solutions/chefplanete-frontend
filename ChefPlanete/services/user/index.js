import { getBaseUrl, handleError, pullOutJson } from "../index";

export const signIn = (idToken) => {
  const headers = new Headers({ 'content-type': 'application/json' });
  console.log(encodeURI(`${getBaseUrl()}/auth/signin/${idToken}`));
  return fetch(encodeURI(`${getBaseUrl()}/auth/signin/${idToken}`), {
    credentials: "include",
    method: "GET",
    headers
  })
    .then(handleError)
    .then(pullOutJson);
};

export const register = (idToken) => {
  const headers = new Headers({ 'content-type': 'application/json' });
  return fetch(encodeURI(`${getBaseUrl()}/auth/signup/${idToken}`), {
    credentials: "include",
    method: "GET",
    headers
  })
    .then(handleError)
    .then(pullOutJson);
};
