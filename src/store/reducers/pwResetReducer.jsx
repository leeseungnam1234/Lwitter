import { SET_EMAIL, SET_SUCCESS, SET_ERROR } from "../actionTypes";

const initialState = {
  email: "",
  isSuccess: false,
  error: null,
};

const pwResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_SUCCESS:
      return { ...state, isSuccess: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default pwResetReducer;
