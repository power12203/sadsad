import React from "react";
import styled, { css } from "styled-components";
import palette from "./palette";
import { Link } from "react-router-dom";

const SButton = css`
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.Gray[8]};
  &:hover {
    background: ${palette.Gray[6]};
  }
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.5rem;
      padding-bottom: 0.6rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.Cyan &&
    css`
      background: ${palette.Cyan[5]};
      &:hover {
        background: ${palette.Cyan[4]};
      }
    `}
  ${(props) =>
    props.Indigo &&
    css`
      background: ${palette.Indigo[5]};
      &:hover {
        background: ${palette.Indigo[4]};
      }
    `}
  &:disabled {
    background: ${palette.Cyan[3]};
    color: ${palette.Cyan[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${SButton}
`;

const StyledLink = styled(Link)`
  ${SButton}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} Cyan={props.Cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
