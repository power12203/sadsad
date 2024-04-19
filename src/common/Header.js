import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";
import palette from "./palette";
import { logout } from "../modules/user";
import { connect } from "react-redux";
import { reset_posts } from "../modules/postList";

const HeaderDiv = styled.div`
  position: fixed;
  width: 100%;
  background: ${palette.Yellow[0]};
  box-sizing: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    text-decoration: none;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`;
const SpaceDiv = styled.div`
  height: 4rem;
`;
const Header = (props) => {
  const { user, logout, reset_posts } = props;
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    logout();
    reset_posts();
    navigate("/");
  }, [logout, reset_posts, navigate]);
  return (
    <>
      <HeaderDiv>
        <Wrapper>
          <Link to="/" className="logo">
            Kjg
          </Link>
          {user ? (
            <div className="right">
              <div style={{ marginRight: "5px" }}>{user.username}</div>
              <Button onClick={onClick}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login" style={{ marginRight: "5px" }}>
                로그인
              </Button>
              <Button to="/register">회원 가입</Button>
            </div>
          )}
        </Wrapper>
      </HeaderDiv>
      <SpaceDiv />
    </>
  );
};

export default connect(
  (state) => ({
    user: state.user.user,
  }),
  {
    logout,
    reset_posts,
  }
)(Header);
