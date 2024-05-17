import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTweets, deleteTweet } from "../store/reducers/tweetsReducer";
import Tweet from "./tweet";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const handleDelete = (tweetId) => {
    dispatch(deleteTweet(tweetId));
  };

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          {...tweet}
          onDelete={() => handleDelete(tweet.id)}
        />
      ))}
    </Wrapper>
  );
}
