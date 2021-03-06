import dietaryProfileReducer, * as dp from './dietaryProfile';
import userReducer, * as user from './user';
import cameraReducer, * as camera from "./camera";
import pantryReducer, * as pantry from "./pantry";
import weeklyGoalsReducer, * as weeklyGoals from "./weeklyGoals";
import searchReducer, * as search from "./search";

/**
 * Add all reducers to this default import. Use the form 'storeName': reducer.
 */
export default {
  dp: dietaryProfileReducer,
  user: userReducer,
  pantry: pantryReducer,
  camera: cameraReducer,
  search: searchReducer,
  weeklyGoals: weeklyGoalsReducer,
};

/**
 * The rest of this file to is to extend getter functions which only retrieve
 * data already in the store, in other words, functions which do not need
 * network connectivity.
 */

export const getUser = (state) => user.getUser(state.user);
export const userIsLoading = (state) => user.isLoading(state.user);
export const getUserErrors = (state) => user.getErrors(state.user);

export const getDietaryProfile = (state) => dp.getDietaryProfile(state.dp);
export const dietaryProfileIsLoading = (state) => dp.isLoading(state.dp);
export const getDietaryProfileErrors = (state) => dp.getErrors(state.dp);

export const getPantry =  (state) => pantry.getPantry(state.pantry);
export const pantryIsLoading =  (state) => pantry.isLoading(state.pantry);
export const getPantryErrors =  (state) => pantry.getErrors(state.pantry);

export const getIngredients = (state) => camera.getIngredients(state.camera);
export const cameraIsLoading = (state) => camera.isLoading(state.camera);
export const getIngredientsErrors = (state) => camera.getErrors(state.camera);

export const getGoals =  (state) => weeklyGoals.getGoals(state.weeklyGoals);
export const goalsIsLoading =  (state) => weeklyGoals.isLoading(state.weeklyGoals);
export const getGoalsErrors =  (state) => weeklyGoals.getErrors(state.weeklyGoals);

export const getSearchedRecipes = (state) => search.getRecipesByKeywords(state.search);
export const searchIsLoading = (state) => search.isLoading(state.search);
export const getSearchedRecipesErrors = (state) => search.getErrors(state.search);
