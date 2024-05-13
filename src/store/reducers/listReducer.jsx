import { SET_CONTENTS, SET_CURRENT_PAGE } from "../actionTypes";

const initialState = {
  contents: [],
  currentPage: 1,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENTS:
      return { ...state, contents: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default listReducer;
