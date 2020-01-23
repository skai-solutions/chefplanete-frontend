import {getAuthorizationToken, getBaseUrl, handleError, pullOutJson} from "../index";

export const sendImageForScanning = (base64) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  console.log(encodeURI(`${getBaseUrl()}/api/receipt`));
  return fetch(encodeURI(`${getBaseUrl()}/api/receipt`), {
    method: "POST",
    headers,
    body: JSON.stringify({
      base64Image: base64,
      imageType: 'png',
    }),
  })
    .then(handleError)
    .then(pullOutJson);
};
