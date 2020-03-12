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

export const getRecipesByIngredientUsageAndRestrictions = (ingredients, restrictions) => {
  const ingredientNames = ingredients.join(",");
  return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&addRecipeInformation=true&includeIngredients=${ingredientNames}&sort=min-missing-ingredients`), {
    method: "GET",
  })
    .then(handleError)
    .then(pullOutJson);
};

export const searchRecipesByTextIngredientsAndRestrictions = (query, ingredients, restrictions) => {
  const ingredientNames = ingredients.join(",");
  const restrictionList = restrictions.join(",");
  return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&query=${query}&intolerances=${restrictionList}&addRecipeInformation=true&includeIngredients=${ingredientNames}&sort=min-missing-ingredients`), {
    method: "GET",
  })
    .then(handleError)
    .then(pullOutJson);
};
