import { handleActions } from "redux-actions";
import { finish_loading, start_loading } from "./loading";
import * as api from "./api/posts";

const READ_LOADING = "readLoading";
const READ_SUCCESS = "post/READ_SUCCESS";
const READ_FAILURE = "post/READ_FAILURE";

export const read_post = (postId) => async (dispatch) => {
  console.log(postId);
  start_loading(READ_LOADING);
  try {
    const response = await api.read_post(postId);
    console.log(response);
    dispatch({ type: READ_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: READ_FAILURE, payload: error });
  } finally {
    finish_loading(READ_LOADING);
    return;
  }
};

const initialState = {
  post: null,
  postError: null,
};

const post = handleActions(
  {
    [READ_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [READ_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
  },
  initialState
);

export default post;
