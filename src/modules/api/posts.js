import axios from "axios";
const request = axios.create();

export const write_post = (title, body, tags) =>
  request.post("/api/posts", { title, body, tags });

export const read_post = (id) => request.get(`/api/posts/${id}`);

export const list_post = (page, username, tag) =>
  request.get(`/api/posts`, { params: { page, username, tag } });

export const update_post = (id, title, body, tags) =>
  request.patch(`/api/posts/${id}`, { title, body, tags });

export const remove_post = (id) => request.delete(`/api/posts/${id}`);

// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import * as authAPI from "../lib/api/auth";
// import axios from "axios";

// const CHANGE_FIELD = "auth/CHANGE_FIELD";
// const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

// export const changeField = createAction(
//   CHANGE_FIELD,
//   ({ form, key, value }) => ({
//     form, //register, login
//     key, //username, password, passwordConfirm
//     value, //실제 바꾸는 값
//   })
// );
// export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register, login

// const LOGIN = "auth/LOGIN";
// const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
// const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

// export const login = (username, password) => async (dispatch) => {
//   dispatch({ type: LOGIN });
//   try {
//     const response = await authAPI.login({ username, password });
//     dispatch({ type: LOGIN_SUCCESS, payload: response.data });
//   } catch (e) {
//     dispatch({ type: LOGIN_FAILURE, payload: e, error: true });
//     throw e;
//   }
// };

// const REGISTER = "auth/REGISTER";
// const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
// const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

// export const register = (username, password) => async (dispatch) => {
//   dispatch({ type: REGISTER });
//   try {
//     const response = await authAPI.login({ username, password });
//     dispatch({ type: REGISTER_SUCCESS, payload: response.data });
//   } catch (e) {
//     dispatch({ type: REGISTER_FAILURE, payload: e, error: true });
//     throw e;
//   }
// };

// const request = axios.create();

// export const write_post = (title, body, tags) =>
//   request.post("/posts", { title, body, tags });

// const initialState = {
//   loading: {
//     LOGIN: false,
//     REGISTER: false,
//   },
//   register: {
//     username: "",
//     password: "",
//     passwordConfirm: "",
//   },
//   login: {
//     username: "",
//     password: "",
//   },
//   auth: null,
//   authError: null,
// };

// const auth = handleActions(
//   {
//     [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
//       produce(state, (draft) => {
//         draft[form][key] = value; //state.register.username
//       }),
//     [INITIALIZE_FORM]: (state, { payload: form }) => ({
//       ...state,
//       [form]: initialState[form],
//       authError: null, //폼 전환 시 회원 인증 에러 초기화
//     }),
//     [REGISTER]: (state) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         REGISTER: true,
//       },
//     }),
//     [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         REGISTER: true,
//       },
//       authError: null,
//       auth,
//     }),
//     [REGISTER_FAILURE]: (state, { payload: error }) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         REGISTER: true,
//       },
//       authError: error,
//     }),
//     [LOGIN]: (state) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         LOGIN: true,
//       },
//     }),
//     [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         LOGIN: false,
//       },
//       authError: null,
//       auth,
//     }),
//     [LOGIN_FAILURE]: (state, { payload: error }) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         LOGIN: false,
//       },
//       authError: error,
//     }),
//   },
//   initialState
// );
// export default auth;
