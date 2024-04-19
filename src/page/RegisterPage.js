import React, { useEffect, useState } from "react";
import Template from "../components/auth/Template";
import Form from "../components/auth/Form";
import { connect } from "react-redux";
import { change_mode, reset_form, register } from "../modules/auth";
import { useNavigate } from "react-router-dom";
import { check } from "../modules/user";

const RegisterPage = (props) => {
  const { form, auth, authError } = props;
  const { user, checkLoading, registerLoading, check } = props;
  const { change_mode, reset_form, register } = props;
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    change_mode("register", name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes("")) {
      setError("빈칸을 모두 입력하세용");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀 번호가 일치하지 않습니다.");
      change_mode("register", password, "");
      change_mode("register", passwordConfirm, "");
      return;
    }
    register(username, password);
  };
  useEffect(() => {
    reset_form("register");
  }, [reset_form]);

  useEffect(() => {
    if (authError && authError.response.status === 409) {
      //server 아이디 중복되지 않게 api구성
      console.log(authError);
      setError("이미 존재하는 계정명 입니다");
      return;
    }
    if (authError && authError.response.status === 400) {
      //server 아이디 중복되지 않게 api구성
      console.log(authError);
      setError("회원가입 실패");
      return;
    }
    if (auth) {
      console.log(auth);
      check();
    }
  }, [auth, authError, check]);
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
      navigate("/");
    }
  }, [user, navigate]);

  if (registerLoading) return <div>loading...</div>;
  if (checkLoading) return <div>loading...</div>;
  return (
    <Template>
      <Form
        mode="register"
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
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
    registerLoading: state.loading.registerLoading,
    checkLoading: state.loading.checkLoading,
  }),
  {
    change_mode,
    reset_form,
    register,
    check,
  }
)(RegisterPage);

//로그인성공시=>백앤드 (쿠키세션아이디)//스테이스 리스 //구분 /로그인 방식 /토큰, 세션기반,오스기반
