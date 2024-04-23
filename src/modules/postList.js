import {handleActions} from "redux-actions";
import * as api from './api/posts'
import {start_loading, finish_loading} from "./loading";

const LIST_LOADING = 'listLoading'
const LIST_SUCCESS = 'postList/LIST_SUCCESS'
const LIST_FAILURE = 'postList/LIST_FAILURE'

export const list_post = (page, username, tag) => async dispatch =>{
    start_loading(LIST_LOADING)
    try{
        const response = await api.list_post(page, username, tag);
        // console.log(response)
        dispatch({type:LIST_SUCCESS, payload: [response.data, response.headers['last-page']]})
    }catch(e){
        dispatch({type:LIST_FAILURE, payload: e, error: true})
        throw(e)
    }finally {
        finish_loading(LIST_LOADING)
        return;
    }
}

const initialState = {
    posts: null,
    postsError: null,
    lastPage: 1,
}

const postList = handleActions({
    [LIST_SUCCESS]: (state, {payload: [posts, lastPage]})=>({
        ...state,
        posts,
        postsError: null,
        lastPage,
    }),
    [LIST_FAILURE]: (state, {payload: postsError})=>({
        ...state,
        posts:null,
        postsError,
    }),
}, initialState)

export default postList;
