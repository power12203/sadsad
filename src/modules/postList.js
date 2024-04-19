import { handleActions } from "redux-actions";
import { finish_loading, start_loading } from "./loading";
import * as api from "./api/posts";

const RESET_POSTS = "postList/RESET_POSTS";

const LIST_LOADING = "listLoading";
const LIST_SUCCESS = "postList/LIST_SUCCESS";
const LIST_FAILURE = "postList/LIST_FAILURE";

export const reset_posts = () => ({ type: RESET_POSTS });

export const list_post = (page, user, tag) => async (dispatch) => {
  start_loading(LIST_LOADING);
  try {
    const response = await api.list_post(page, user, tag);
    dispatch({
      type: LIST_SUCCESS,
      payload: [response.data, response.headers["last-page"]],
    });
  } catch (error) {
    dispatch({ type: LIST_FAILURE, payload: error });
    throw error;
  } finally {
    finish_loading(LIST_LOADING);
    return;
  }
};

const initialState = {
  posts: null,
  postsError: null,
  lastPage: 3,
};

const postList = handleActions(
  {
    [RESET_POSTS]: () => initialState,
    [LIST_SUCCESS]: (state, { payload: [posts, lastPage] }) => ({
      ...state,
      posts,
      postError: null,
      lastPage,
    }),
    [LIST_FAILURE]: (state, { payload: postsError }) => ({
      ...state,
      posts: null,
      postsError,
    }),
  },
  initialState
);

export default postList;
