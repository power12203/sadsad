import React from "react";
import Responsive from "../../common/Responsive";
import styled from "styled-components";
import palette from "../../common/palette";

const PostResponsive = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHeadDiv = styled.div`
  border-bottom: 1px solid ${palette.Gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.Gray[6]};
  span + span:before {
    color: ${palette.Gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: "\\B7";
  }
`;
const TagDiv = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.Orange[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.Orange[6]};
    }
  }
`;
const Post = (props) => {
  const { post, postError, readLoading } = props;
  //   console.log(post);
  if (postError) {
    // console.log(postError);
    if (postError.response && postError.response.status === 404) {
      ///postId 잘못던진 경우
      return <PostResponsive>존재하지 않는 포스트 입니다.</PostResponsive>;
    }
    return <PostResponsive>오류 발생</PostResponsive>;
  }
  if (readLoading) return <div>loading....</div>;
  if (!post) return null;
  const { title, body, user, publishDate, tags } = post;
  console.log(user);
  return (
    <PostResponsive>
      <PostHeadDiv>
        <h1>{title}</h1>
        <SubInfo>
          <span>
            <b>{user.username}</b>
          </span>
          <span>{new Date(publishDate).toLocaleDateString()}</span>
        </SubInfo>
        <TagDiv>
          {tags.map((tag) => (
            <div className="tag">#{tag}</div>
          ))}
        </TagDiv>
      </PostHeadDiv>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </PostResponsive>
  );
};

export default Post;
