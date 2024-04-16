import React, { useEffect } from "react";
import Template from "../components/auth/Template";
import Form from "../components/auth/Form";
import { connect } from "react-redux";
import { change_mode, register, reset_form } from "../modules/auth";

const LoginPage = (props) => {
  const { form } = props;
  const { change_mode, reset_form } = props;

  const onChange = (e) => {
    const { name, value } = e.target;
    change_mode("login", name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    console.log(username);
    if (username !== password) {
      return;
    }
    register(username, password);
  };
  useEffect(() => {
    reset_form("login");
  }, [reset_form]);
  return (
    <Template>
      <Form mode="login" form={form} onChange={onChange} onSubmit={onSubmit} />
    </Template>
  );
};

export default connect(
  (state) => ({
    form: state.auth.login,
  }),
  {
    change_mode,
    reset_form,
    register,
  }
)(LoginPage);
