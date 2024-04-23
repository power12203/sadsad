import React, {useEffect, useState} from 'react';
import Template from "../components/auth/Template";
import Form from "../components/auth/Form";
import {connect} from "react-redux";
import {change_form, login, reset_form} from "../modules/auth";
import {useNavigate} from "react-router-dom";
import {check} from "../modules/user";

const LoginPage = (props) => {
    const {form, auth, authError, user, loginLoading} = props;
    const {change_form, reset_form, login, check} = props;
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const onChange = e =>{
        const {value, name} = e.target;
        // console.log(value)
        change_form('login', name, value)
    }
    const onSubmit = e =>{
        e.preventDefault();
        const {username, password} = form
        login(username, password)
    }
    useEffect(() => {
        reset_form('login')
    }, [reset_form]);

    useEffect(()=>{
        if(authError){
            console.log(authError)
            setError('로그인 실패')
            return;
        }
        if(auth){
            console.log(auth);
            check()
        }
    }, [auth, authError, check, setError])

    useEffect(() => {
        if(user){
            navigate(`/${user.username}`)
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch (e){
                console.log('localStorage is not working')
            }
        }
    }, [user, navigate]);

    if(loginLoading) return <div>loading....</div>
    return (
        <Template>
            <Form
                mode="login"
                form = {form}
                error = {error}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </Template>
    );
};

export default connect(
    state=> {
        return{
            form: state.auth.login,
            auth: state.auth.auth,
            authError: state.auth.authError,
            user: state.user.user,
            loginLoading: state.loading.loginLoading,
        }
    },
    {
        change_form,
        reset_form,
        login,
        check,
    }
)(LoginPage);
