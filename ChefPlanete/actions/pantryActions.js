import actionTypes from "./actionTypes";

import { getPantry, updatePantry} from "../services/pantry";

export const fetchPantry = () => (dispatch) => {
    // Start the action call
    dispatch({
        type: actionTypes.FETCH_PANTRY_STARTED,
    });
    // Handle the successful http request
    return getPantry().then((response) => {
        dispatch({
            type: actionTypes.FETCH_PANTRY_SUCCESS,
            payload: response,
        });
        // Handle the error (if there is one)
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: actionTypes.FETCH_PANTRY_FAILURE,
            payload: error,
        });
        // Handle the ending, regardless of whether success or error
        return Promise.reject(error);
    });
};

export const updateUserPantry = (updatedPantry) => (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_PANTRY_STARTED,
    });
    return updatePantry(updatedPantry).then(() => {
        dispatch({
            type: actionTypes.UPDATE_PANTRY_SUCCESS,
            payload: updatedPantry,
        });
        // Handle the error (if there is one)
    }).catch((error) => {
         console.log(error);
         dispatch({
            type: actionTypes.UPDATE_PANTRY_FAILURE,
             payload: error,

        });
        return Promise.reject(error);
    });
};