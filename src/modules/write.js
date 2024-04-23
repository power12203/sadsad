import { handleActions } from "redux-actions";
import * as api from "./api/posts";
import { finish_loading, start_loading } from "./loading";

const RESET_WRITE = "write/RESET_WRITE";
const CHANGE_FIELD = "write/CHANGE_KEY";
const SET_POST = "write/SET_POST";

const WRITE_LOADING = "writeLoading";
const WRITE_SUCCESS = "write/WRITE_SUCCESS";
const WRITE_FAILURE = "write/WRITE_FAILURE";

const UPDATE_LOADING = "updateLoading";
const UPDATE_SUCCESS = "write/UPDATE_SUCCESS";
const UPDATE_FAILURE = "write/UPDATE_FAILURE";

export const reset_write = () => ({ type: RESET_WRITE });
export const change_field = (key, value) => ({
  type: CHANGE_FIELD,
  key,
  value,
});
export const set_post = (post) => ({ type: SET_POST, post });

export const write_post = (title, body, tags) => async (dispatch) => {
  start_loading(WRITE_LOADING);
  try {
    const response = await api.write_post(title, body, tags);
    console.log("78979", response.data);
    dispatch({ type: WRITE_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: WRITE_FAILURE, payload: e, error: true });
    throw e;
  } finally {
    finish_loading(WRITE_LOADING);
    return;
  }
};

export const update_post = (id, title, body, tags) => async (dispatch) => {
  start_loading(UPDATE_LOADING);
  try {
    const response = await api.update_post(id, title, body, tags);
    console.log(response.data);
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
  post: null,
  postError: null,
  postId: null,
};

const write = handleActions(
  {
    [RESET_WRITE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { key, value }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [WRITE_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
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
