import {
  getApiUrl,
  getAuthorizationToken,
  handleError,
  pullOutJson,
  getCurrentUserId,
  getRecipeApiKey,
} from "../index";

export const sendSearchKeywords = (keyword) => {
  return fetch(encodeURI(`https://api.spoonacular.com/recipes/search?apiKey=${getRecipeApiKey()}&query=${keyword}`), {
    method: "GET",
  })
    .then(handleError)
    .then(pullOutJson);
}