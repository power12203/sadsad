import {handleActions} from "redux-actions";
import {finish_loading, start_loading} from "./loading";
import * as api from "./api/auth"

const CHANGE_FORM = "auth/CHANGE_FIELD"
const RESET_FORM = 'auth/RESET_FORM'

export const change_form = (form, key, value) => ({type:CHANGE_FORM, form, key, value})
export const reset_form = (form) => ({type: RESET_FORM, form})

const LOGINLOADING = 'loginLoading'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const login = (username, password) => async dispatch =>{
    start_loading(LOGINLOADING)
    try{
        const response = await api.login(username, password);
        dispatch({type:LOGIN_SUCCESS, payload: response.data})
    }catch(e){
        dispatch({type:LOGIN_FAILURE, payload: e, error: true})
        throw(e)
    }finally {
        finish_loading(REGISTERLOADING)
        return;
    }
}

const REGISTERLOADING = 'registerLoading'
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'

export const register = (username, password) => async dispatch =>{
    start_loading(REGISTERLOADING)
    try{
        const response = await api.register(username, password);
        dispatch({type:REGISTER_SUCCESS, payload: response.data})
    }catch(e){
        console.log(e)
        dispatch({type:REGISTER_FAILURE, payload: e})

    }finally {
        finish_loading(REGISTERLOADING)
        return;
    }

}

const initialState = {
    register:{
        username:'',
        password:'',
        passwordConfirm:'',
    },
    login:{
        username:'',
        password:'',
    },
    auth: null,
    authError: null,
};

const auth = handleActions({
    [CHANGE_FORM]: (state, {form, key, value}) => {
        return {
            ...state,
            [form]: {
                ...state[form],
                [key]: value,
            }
        }
    },
    [RESET_FORM]: (state, {form}) => {
        // console.log(form)
        return {
        ...state,
            [form]: initialState[form]
        }
    },
    [REGISTER_SUCCESS]: (state, {payload: auth})=>({
        ...state,
        authError: null,
        auth,
    }),
    [REGISTER_FAILURE]: (state, {payload:error}) => {
        console.log(error)
        return {
        ...state,
        auth: null,
        authError: error,
    }},
    [LOGIN_SUCCESS]: (state, {payload: auth})=>({
        ...state,
        authError: null,
        auth,
    }),
    [LOGIN_FAILURE]: (state, {payload: error}) =>({
        ...state,
        auth: null,
        authError: error,
    }),

}, initialState);

export default auth;
