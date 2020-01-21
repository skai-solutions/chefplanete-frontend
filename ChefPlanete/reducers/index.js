import dietaryProfileReducer, * as dp from './dietaryProfile';
import userReducer, * as user from './user.js'

/**
 * Add all reducers to this default import. Use the form 'storeName': reducer.
 */
export default {
  dp: dietaryProfileReducer,
  user: userReducer,
};

/**
 * The rest of this file to is to extend getter functions which only retrieve
 * data already in the store, in other words, functions which do not need
 * network connectivity.
 */

export const getUser = (state) => user.getUser(state.user);
export const userIsLoading = (state) => user.isLoading(state.user);

export const getDietaryProfile = (state) => dp.getDietaryProfile(state.dp);
export const dietaryProfileIsLoading = (state) => dp.isLoading(state.dp);
