import actionTypes from "./actionTypes";
import  {sendSearchKeywords} from "../services/search";


export const searchRecipes = (keyWord) => (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_RECIPES_STARTED,
  });
  return sendSearchKeywords(keyWord).then((recipes) => {
    dispatch({
      type: actionTypes.SEARCH_RECIPES_SUCCESS,
      payload: recipes,
    });
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.SEARCH_RECIPES_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};