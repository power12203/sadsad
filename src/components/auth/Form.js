import React from 'react';
import styled from "styled-components";
import Button from "../../common/Button";
import {Link} from "react-router-dom";
import palette from "../../common/palette";


const FormDiv = styled.div`
    h3{
        margin:0;
        color: ${palette.Gray[8]};
        margin-bottom: 1rem;
    }
`
const StyleInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.Gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.Gray[7]};
    }
    &+&{
        margin-top: 1rem;
    }
`
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a{
        color: ${palette.Indigo[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.Indigo[9]};
        }
    }
`
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`
const textMap = {
    login: '로그인',
    register: '회원가입',
};

const Form = (props) => {
    const {mode, form, error} = props;
    const {onChange, onSubmit} = props;
    const text = textMap[mode];
    return (
        <FormDiv>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyleInput
                    autoComplete='username'
                    name="username"
                    placeholder="아이디"
                    onChange={onChange}
                    value={form.username}
                />
                <StyleInput
                    autoComplete="new-password"
                    name='password'
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />
                {mode === 'register' && (
                <StyleInput
                    autoComplete="new-password"
                    name='passwordConfirm'
                    placeholder="비밀번호 확인"
                    type='password'
                    onChange={onChange}
                    value={form.passwordConfirm}
                />) }
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button orange fullWidth>{text}</Button>
            </form>
            <Footer>
                {mode === 'login' ? (
                    <Link to='/register'>회원가입</Link>
                ):(
                    <Link to='/login'>로그인</Link>
                )}
            </Footer>
        </FormDiv>
    );
};

export default Form;
