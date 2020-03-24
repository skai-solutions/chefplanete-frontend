import {
  handleError,
  pullOutJson,
  getCurrentUserId,
  getRecipeApiKey,
} from "../index";

export const getSingleRecipeById = (id) => {
  return fetch(encodeURI(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${getRecipeApiKey()}`), {
    method: "GET",
  })
    .then(handleError)
    .then(pullOutJson);
};

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
  const restrictionList = restrictions.join(",");
  if (ingredients.length === 0) {
    return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&intolerances=${restrictionList}&addRecipeInformation=true&sort=random&ignorePantry=true&tags=easy&instructionsRequired=true`), {
      method: "GET",
    })
      .then(handleError)
      .then(pullOutJson);
  }
  else {
    return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&intolerances=${restrictionList}&addRecipeInformation=true&includeIngredients=${ingredientNames}&sort=min-missing-ingredients&ignorePantry=true&instructionsRequired=true`), {
      method: "GET",
    })
      .then(handleError)
      .then(pullOutJson);
  }
};

export const searchRecipesByTextIngredientsAndRestrictions = (query, ingredients, restrictions) => {
  const ingredientNames = ingredients.join(",");
  const restrictionList = restrictions.join(",");
  if (ingredients.length === 0 && query.length === 0) {
    return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&intolerances=${restrictionList}&addRecipeInformation=true&sort=random&ignorePantry=true&tags=easy&instructionsRequired=true`), {
      method: "GET",
    })
      .then(handleError)
      .then(pullOutJson);
  } else {
    return fetch(encodeURI(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${getRecipeApiKey()}&fillIngredients=true&query=${query}&intolerances=${restrictionList}&addRecipeInformation=true&includeIngredients=${ingredientNames}&sort=min-missing-ingredients&ignorePantry=true&instructionsRequired=true`), {
      method: "GET",
    })
      .then(handleError)
      .then(pullOutJson);
  }
};
