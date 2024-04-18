import { handleActions } from "redux-actions";
import { finish_loading, start_loading } from "./loading";
import * as api from "./api/posts";

const RESET_WRITE = "write/RESET_WRITE";
const CHANG_FIELD = "write/CHANG_FIELD";

export const reset_write = () => ({ type: RESET_WRITE });

export const chang_field = (key, value) => ({ type: CHANG_FIELD, key, value });

// key: 'title', 'body', 'tags'
// value: t_value,b_value,tag_value
// {
//     ...state,
//     [key]: value
// }
const WRITE_LOADING = "writeLoading";
const WRITE_SUCCESS = "write/WRITE_SUCCESS";
const WRITE_FAILURE = "write/WRITE_FAILURE";

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
  },
  initialState
);

export default write;
