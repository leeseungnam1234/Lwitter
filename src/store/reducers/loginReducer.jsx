import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_LOADING,
  SET_ERROR,
} from "../actionTypes";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
  error: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
