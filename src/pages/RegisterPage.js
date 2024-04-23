import React, {useEffect, useState} from 'react';
import Template from "../components/auth/Template";
import Form from "../components/auth/Form";
import {connect} from "react-redux"
import {change_form, reset_form, register} from "../modules/auth";
import {check} from "../modules/user"
import {useNavigate} from "react-router-dom";

const RegisterPage = (props) => {
    const {form, auth, authError, user, registerLoading} = props;
    const {change_form, reset_form, register, check} = props;
    const [error, setError] = useState();
    const navigate = useNavigate();
    const onChange = e =>{
        const {value, name} = e.target;
        change_form('register', name, value)
    }
    const onSubmit = e =>{
        e.preventDefault();
        const {username, password, passwordConfirm} = form
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요.')
            return;
        }
        if(password!==passwordConfirm){
            setError("비밀번호가 일치하기 않습니다.")
            change_form('register', password, "")
            change_form('register', passwordConfirm, "")
            return;
        }
        register(username, password)
    }
    useEffect(() => {
        reset_form('register')
    }, [reset_form]);

    useEffect(()=>{
        console.log(authError)
        if(authError && authError.response.status===409){
            setError("이미 존재하는 계정명입니다.");
            return;
        }
        if(authError){
            console.log(authError)
            setError("회원가입 실패")
            return;
        }
        if(auth){
            console.log(auth);
            check()
        }
    }, [auth, authError, check])

    useEffect(() => {
        if(user){
            navigate(`/${user.usename}`)
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch (e){
                console.log('localStorage is not working')
            }
        }
    }, [user, navigate]);
    if(registerLoading) return <div>loading...</div>
    return (
        <Template>
            <Form
                mode='register'
                form ={form}
                error={error}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </Template>
    );
};

export default connect(
    state=> {
        return{
            form: state.auth.register,
            auth: state.auth.auth,
            authError: state.auth.authError,
            user: state.user.user,
            registerLoading: state.loading.registerLoading,
        }
    },
    {
        change_form,
        reset_form,
        register,
        check,
    }
)(RegisterPage);
