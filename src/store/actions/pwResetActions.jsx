import { SET_EMAIL, SET_SUCCESS, SET_ERROR } from "../actionTypes";

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setSuccess = (isSuccess) => ({
  type: SET_SUCCESS,
  payload: isSuccess,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
