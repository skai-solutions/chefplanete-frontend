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
    // body: JSON.stringify({
    //   apiKey: '998c4c5379e741b18622557bc0cc52b2',
    //   number: '5',
    //   ingredients: keyWord,
    // }),
  })
    .then(handleError)
    .then(pullOutJson);
}