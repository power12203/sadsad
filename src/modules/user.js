import {handleActions} from "redux-actions";
import * as api from "./api/auth";
import {finish_loading, start_loading} from "./loading";

const CHECKLOADING = 'checkLoading';
const CHECK_SUCCESS = 'user/CHECK_SUCCESS'
const CHECK_FAILURE = 'user/CHECK_FAILURE'
const SET_USER = "user/SET_USER"
const LOGOUT = 'user/LOGOUT'

export const set_user = (user) => ({type: SET_USER, user})
export const logout = () => async dispatch =>{
    try{
        const response = await api.logout();
        localStorage.removeItem('user')
        dispatch({type:LOGOUT, payload: response.data})
    }catch(e){
        checkFailure();
    }finally {
        return;
    }
}

function checkFailure(){
    try{
        localStorage.removeItem('user')
    }catch(e){
        console.log("localStorage is not working");
    }
}
export const check = () => async dispatch =>{
    start_loading(CHECKLOADING)
    try{
        const response = await api.check();
        dispatch({type:CHECK_SUCCESS, payload: response.data})
    }catch(e){
        dispatch({type:CHECK_FAILURE, payload: e, error: true})
        checkFailure();
    }finally {
        finish_loading(CHECKLOADING)
        return;
    }
}

const initialState = {
    user: null,
    checkError: null,
}

const user = handleActions({
    [SET_USER]: (state, {user}) =>({
        ...state,
        user,
        checkError: null
    }),
    [CHECK_SUCCESS]: (state, {payload: user})=>({
        ...state,
        user,
        checkError: null,
    }),
    [CHECK_FAILURE]: (state, {payload: checkError}) => ({
        ...state,
        user: null,
        checkError,
    }),
    [LOGOUT]: (state, {payload: answer}) => ({
        ...state,
        user: null,
        checkError: null,
    })
}, initialState)

export default user;
