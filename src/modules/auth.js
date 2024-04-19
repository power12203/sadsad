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
    console.log(username, password, "hello");
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    throw error;
  } finally {
    finish_loading(REGISTER_LOADING);
    return;
  }
};
const LOGIN_LOADING = "loginLoading";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const login = (username, password) => async (dispatch) => {
  start_loading(LOGIN_LOADING);
  try {
    const response = await api.login(username, password);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    throw error;
  } finally {
    finish_loading(LOGIN_LOADING);
    return;
  }
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
      auth: null,
      authError: null,
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
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: null,
      authError: error,
    }),
  },
  initialState
);

export default auth;

// const LOGIN_LOADING = "loginLoading";
// const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
// const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

// export const register = (username, password) => async (dispatch) => {
//   start_loading(LOGIN_LOADING);
//   try {
//     const response = await api.register(username, password);
//     dispatch({ type: LOGIN_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: REGISTER_FAILURE, payload: error });
//   } finally {
//     finish_loading(LOGIN_FAILURE);
//     return;
//   }
// };
