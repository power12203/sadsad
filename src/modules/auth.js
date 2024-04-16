import { handleActions } from "redux-actions";
import { start_loading, finish_loading } from "./loading";
import * as api from "./api/auth";

const CHANGE_MODE = "auth/CHANGE_MODE";
const RESET_FORM = "auth/RESET_FORM"; //on체인지 변환

export const change_mode = (form, key, value) => ({
  type: CHANGE_MODE,
  form,
  key,
  value,
});

export const reset_form = (form) => ({ type: RESET_FORM, form });

const REGISTER_LOADING = "registerLoading";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

export const register = (username, password) => async (dispatch) => {
  start_loading(REGISTER_LOADING);
  try {
    const response = await api.register(username, password);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: REGISTER_FAILURE, payload: e, error: true });
    throw e;
  }
  finish_loading(REGISTER_FAILURE);
};

const initialState = {
  login: {
    username: "",
    password: "",
  },
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_MODE]: (state, { form, key, value }) => ({
      ...state,
      [form]: {
        ...state[form],
        [key]: value,
      },
    }),
    [RESET_FORM]: (state, { form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
  },
  initialState
);

export default auth;
