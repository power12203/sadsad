import { handleActions } from "redux-actions";
import { finish_loading, start_loading } from "./loading";
import * as api from "./api/posts";

const RESET_WRITE = "write/RESET_WRITE";
const CHANG_FIELD = "write/CHANG_FIELD";
const SET_POST = "write/SET_POST";

export const reset_write = () => ({ type: RESET_WRITE });

export const chang_field = (key, value) => ({ type: CHANG_FIELD, key, value });

export const set_post = (post) => ({ type: SET_POST, post });

// key: 'title', 'body', 'tags'
// value: t_value,b_value,tag_value
// {
//     ...state,
//     [key]: value
// }
const WRITE_LOADING = "writeLoading";
const WRITE_SUCCESS = "write/WRITE_SUCCESS";
const WRITE_FAILURE = "write/WRITE_FAILURE";
const UPDATE_LOADING = "updateLoading";
const UPDATE_SUCCESS = "write/UPDATE_SUCCESS";
const UPDATE_FAILURE = "write/UPDATE_FAILURE";

export const write_post = (title, body, tags) => async (dispatch) => {
  start_loading(WRITE_LOADING);
  try {
    const response = await api.write_post(title, body, tags);
    dispatch({ type: WRITE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: WRITE_FAILURE, payload: error });
    throw error;
  } finally {
    finish_loading(WRITE_LOADING);
    return;
  }
};

export const update_post = (id, title, body, tags) => async (dispatch) => {
  start_loading(UPDATE_LOADING);
  try {
    const response = await api.update_post(id, title, body, tags);
    // console.log(response.data)
    dispatch({ type: UPDATE_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: UPDATE_FAILURE, payload: e, error: true });
    throw e;
  } finally {
    finish_loading(UPDATE_LOADING);
    return;
  }
};

const initialState = {
  title: "",
  body: "",
  tags: [],
  writer: null,
  writerError: null,
};

const write = handleActions(
  {
    [RESET_WRITE]: (state) => initialState,
    [CHANG_FIELD]: (state, { key, value }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_SUCCESS]: (state, { payload: writer }) => ({
      ...state,
      writer,
      writerError: null,
    }),
    [WRITE_FAILURE]: (state, { payload: writerError }) => ({
      ...state,
      writer: null,
      writerError,
    }),
    [UPDATE_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [UPDATE_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
    [SET_POST]: (state, { post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      postId: post._id,
    }),
  },
  initialState
);

export default write;
