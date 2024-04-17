import React from "react";
import Header from "../common/Header";
import { connect } from "react-redux";
import { logout } from "../modules/user";

const PostListPage = (props) => {
  const { user } = props;
  const { logout } = props;
  const onLogout = () => {
    logout();
  };
  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <div>하이욤</div>
    </>
  );
};

export default connect(
  (state) => ({
    user: state.user.user,
  }),
  {
    logout,
  }
)(PostListPage);
