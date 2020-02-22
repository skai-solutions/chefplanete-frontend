import {
  handleError,
  pullOutJson,
  getCurrentUserId,
  getRecipeApiKey,
} from "../index";

export const getRecipesByIds = (ids) => {
  const recipeIds = ids.join(",");
  return fetch(encodeURI(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${getRecipeApiKey()}&ids=${recipeIds}`), {
    method: "GET",
  })
    .then(handleError)
    .then(pullOutJson);
};
