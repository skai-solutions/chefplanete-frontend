import actionTypes from "./actionTypes";

import {sendImageForScanning} from "../services/camera";

export const scanReceipt = (base64) => (dispatch) => {
  dispatch({
    type: actionTypes.SCANNING_RECEIPT_STARTED,
  });
  return sendImageForScanning(base64).then((ingredients) => {
    dispatch({
      type: actionTypes.SCANNING_RECEIPT_SUCCESS,
      payload: ingredients,
    });
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.UPDATE_DIETARY_PROFILE_FAILURE,
      payload: error,
    });
    return Promise.reject(error);
  });
};