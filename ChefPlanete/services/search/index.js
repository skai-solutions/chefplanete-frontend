import {
  getApiUrl,
  getAuthorizationToken,
  handleError,
  pullOutJson,
  getCurrentUserId,
  getRecipeApiKey,
} from "../index";

export const sendSearchKeywords = (keyword) => {
  return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&query=${keyword}&addRecipeInformation=true&instructionsRequired=true&sort=min-missing-ingredients`), {
    method: "GET",
  })
    .then(handleError)
    .then(pullOutJson);
}