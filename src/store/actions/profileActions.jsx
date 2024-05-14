import {
  SET_AVATAR,
  SET_TWEETS,
  ADD_TWEET,
  REMOVE_TWEET,
} from "../actionTypes";

export const setAvatar = (avatarUrl) => ({
  type: SET_AVATAR,
  payload: avatarUrl,
});

export const setTweets = (tweets) => ({
  type: SET_TWEETS,
  payload: tweets,
});

export const addTweet = (tweet) => ({
  type: ADD_TWEET,
  payload: tweet,
});

export const removeTweet = (tweetId) => ({
  type: REMOVE_TWEET,
  payload: tweetId,
});
