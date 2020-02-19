import {
  getApiUrl,
  getAuthorizationToken,
  handleError,
  pullOutJson,
  getCurrentUserId
} from "../index";

export const sendSearchKeywords = (keyWord) => {
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${getAuthorizationToken()}`
  });
  return fetch(encodeURI('https://api.spoonacular.com/recipes/findByIngredients?'), {
    method: "GET",
    headers,
    body: JSON.stringify({
      apiKey: '998c4c5379e741b18622557bc0cc52b2',
      number: '5',
      ingredients: keyWord,
    }),
  })
    .then(handleError)
    .then(pullOutJson);
}