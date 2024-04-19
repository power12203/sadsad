import React, { useEffect, useState } from "react";
import Template from "../components/auth/Template";
import Form from "../components/auth/Form";
import { connect } from "react-redux";
import { change_mode, reset_form, login } from "../modules/auth";
import { check } from "../modules/user";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const { form, auth, authError, user, loginLoading, checkLoading } = props;
  const { change_mode, reset_form, check, login } = props;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;
    change_mode("login", name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    console.log(username, password);
    login(username, password);
  };
  useEffect(() => {
    reset_form("login");
  }, [reset_form]);
  useEffect(() => {
    if (authError) {
      console.log(error);
      setError("로그인실패");
      return;
    }
    if (auth) {
      console.log(auth);
      check(); //user에 사용자 이름이 등록이 됩니다.
    }
  }, [auth, authError, check, error]);
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
      navigate(`/${user.username}`);
    }
  }, [user, navigate]);
  if (loginLoading) return <div>loading...</div>;
  if (checkLoading) return <div>loading...</div>;
  return (
    <Template>
      <Form
        mode="login"
        form={form}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </Template>
  );
};

export default connect(
  (state) => ({
    form: state.auth.login,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
    loginLoading: state.loading.loginLoading,
    checkLoading: state.loading.checkLoading,
  }),
  {
    change_mode,
    reset_form,
    login,
    check,
  }
)(LoginPage);
