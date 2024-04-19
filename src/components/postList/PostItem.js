import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../common/palette";

const PostItemDiv = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.Gray[2]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.Gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const SubInfo = styled.div`
  color: ${palette.Gray[6]};
  span + span:before {
    color: ${palette.Gray[4]};
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
const PostItem = ({ post }) => {
  const { title, body, tags, user, publishDate, _id } = post;

  return (
    <PostItemDiv>
      <Link to={`/${user.username}/${_id}`}>{title}</Link>
      <SubInfo>
        <span>
          <b>
            <Link to={`/${user.username}`}>{user.username}</Link>
          </b>
        </span>
        <span>{new Date(publishDate).toLocaleDateString()}</span>
      </SubInfo>
      <TagDiv>
        {tags.map((tag, index) => (
          <Link key={index} className="tag" to={`/?tag=${tag}`}>
            #{tag}
          </Link>
        ))}
      </TagDiv>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </PostItemDiv>
  );
};

export default PostItem;
