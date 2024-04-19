import React from "react";
import styled from "styled-components";
import Responsive from "../../common/Responsive";
import PostItem from "./PostItem";
import Button from "../../common/Button";

const PostListResponsive = styled(Responsive)`
  margin-top: 3rem;
`;
const PostListDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostList = (props) => {
  const { posts, postsError, user } = props;
  if (postsError)
    return <PostListResponsive>존재하지 않습니다</PostListResponsive>;
  return (
    <PostListResponsive>
      {user && (
        <PostListDiv>
          <Button Cyan to="/write">
            새 글 작성하기
          </Button>
        </PostListDiv>
      )}
      {posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListResponsive>
  );
};

export default PostList;
