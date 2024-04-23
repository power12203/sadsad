import {handleActions} from "redux-actions";
import * as api from './api/posts';
import {finish_loading, start_loading} from "./loading";

const READ_LOADING = 'readLoading'
const SET_POST = 'post/SET_POST'
const READ_SUCCESS = 'post/READ_SUCCESS'
const READ_FAILURE = 'post/READ_FAILURE'

export const set_post = (post) =>{
    console.log(post)
    return {type:SET_POST, post}
}

export const read_post = (id) => async dispatch =>{
    start_loading(READ_LOADING)
    try{
        const response = await api.read_post(id);
        dispatch({type:READ_SUCCESS, payload: response.data})
    }catch(e){
        dispatch({type:READ_FAILURE, payload: e, error: true})
        throw(e)
    }finally {
        finish_loading(READ_LOADING)
        return;
    }
}

const initialState = {
    post: null,
    postError: null,
}

const post = handleActions({
    [READ_SUCCESS]: (state, {payload: post})=>({
        ...state,
        post,
        postError: null
    }),
    [READ_FAILURE]: (state, {payload: postError})=>({
        ...state,
        post:null,
        postError,
    }),
    [SET_POST]: (state, {post}) =>({
        ...state,
        post,
        postError: null,
    })
}, initialState)

export default post;
