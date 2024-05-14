import {
  SET_AVATAR,
  SET_TWEETS,
  ADD_TWEET,
  REMOVE_TWEET,
} from "../actionTypes";

const initialState = {
  avatar: null,
  tweets: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVATAR:
      return { ...state, avatar: action.payload };
    case SET_TWEETS:
      return { ...state, tweets: action.payload };
    case ADD_TWEET:
      return { ...state, tweets: [...state.tweets, action.payload] };
    case REMOVE_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter((tweet) => tweet.id !== action.payload),
      };
    default:
      return state;
  }
};

export default profileReducer;
