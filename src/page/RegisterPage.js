import React, { useEffect } from "react";
import Template from "../components/auth/Template";
import Form from "../components/auth/Form";
import { connect } from "react-redux";
import { change_mode, reset_form, register } from "../modules/auth";

const RegisterPage = (props) => {
  const { form, auth, authError, registerLoading } = props;
  const { change_mode, reset_form, register } = props;

  const onChange = (e) => {
    const { name, value } = e.target;
    change_mode("register", name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    console.log(username);
    if (password !== passwordConfirm) {
      return;
    }
    register(username, password);
  };
  useEffect(() => {
    reset_form("register");
  }, [reset_form]);

  useEffect(() => {
    if (authError) {
      console.log(authError);
      return;
    }
    if (auth) {
      console.log(auth);
    }
  }, [auth, authError]);

  // if (!registerLoading) return;
  return (
    <Template>
      <Form
        mode="register"
        form={form}
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
    registerLoading: state.loading.registerLoading,
  }),
  {
    change_mode,
    reset_form,
    register,
  }
)(RegisterPage);

//로그인성공시=>백앤드 (쿠키세션아이디)//스테이스 리스 //구분 /로그인 방식 /토큰, 세션기반,오스기반
