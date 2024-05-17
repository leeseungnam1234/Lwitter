import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Post from "./Post";

const FeedContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #334;
`;

const Feed = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <FeedContainer>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </FeedContainer>
  );
};

export default Feed;
