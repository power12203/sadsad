import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../common/palette";
import Button from "../../common/Button";

const FormDiv = styled.div`
  h3 {
    margin: 0;
    color: ${palette.Gray[8]};
    margin-bottom: 1rem;
  }
`;
const InputStyle = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.Gray[5]};
  padding-bottom: 0%.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.Teal[7]};
    border-bottom: 1px solid ${palette.Gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ButtonStyle = styled(Button)`
  margin-top: 1rem;
`;

const FootDiv = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.Gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.Gray[9]};
    }
  }
`;
const textType = {
  login: "로그인",
  register: "회원 가입",
};
const Form = (props) => {
  const { mode, form, onChange, onSubmit } = props;
  const text = textType[mode];
  console.log(form);
  return (
    <FormDiv>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <InputStyle
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <InputStyle
          autoComplete="password"
          name="password"
          placeholder="비밀 번호"
          onChange={onChange}
          value={form.password}
          type="password"
        />
        {mode === "register" && (
          <InputStyle
            autoComplete="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={onChange}
            value={form.passwordConfirm}
            type="password"
          />
        )}
        <ButtonStyle fullWidth Cyan>
          {text}
        </ButtonStyle>
      </form>
      <FootDiv>
        {mode === "login" ? (
          <Link to="/register">회원 가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </FootDiv>
    </FormDiv>
  );
};

export default Form;
