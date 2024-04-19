import React from "react";
import Button from "../../common/Button";
import qs from "qs";
import styled from "styled-components";
const PaginationDiv = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const Pagination = (props) => {
  const { page, lastPage, username, tag } = props;
  const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page });
    return username ? `/${username}?${query}` : `/?${query}`;
  };
  return (
    <PaginationDiv>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </Button>
      <div>{page}</div>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationDiv>
  );
};

export default Pagination;
