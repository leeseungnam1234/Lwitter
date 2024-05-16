import React from "react";
import styled from "styled-components";

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostHeader>
        <Avatar src={post.avatar} alt="avatar" />
        <Username>{post.username}</Username>
      </PostHeader>
      <PostImage src={post.image} alt="post" />
      <PostFooter>
        <LikeButton>좋아요</LikeButton>
        <CommentButton>댓글</CommentButton>
      </PostFooter>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  background-color: #1a0101;
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;
  border-radius: 3px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.div`
  font-weight: bold;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default Post;
