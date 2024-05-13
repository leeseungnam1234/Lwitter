import { SET_CONTENTS, SET_CURRENT_PAGE } from "../actionTypes";

export const setContents = (contents) => ({
  type: SET_CONTENTS,
  payload: contents,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
