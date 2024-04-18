import { handleActions } from "redux-actions";
import * as api from "./api/auth";
import { finish_loading, start_loading } from "./loading";

const CHECK_LOADING = "checkLoading";
const CHECK_SUCCESS = "user/CHECK_SUCCESS";
const CHECK_FAILURE = "user/CHECK_FAILURE";
const SET_USER = "user/SET_USER_TO_LOCALSTORAGE";
const LOGOUT = "user/LOGOUT";

export const set_user = (user) => ({ type: SET_USER, user });
function checkOut() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}
export const check = () => async (dispatch) => {
  start_loading(CHECK_LOADING);
  try {
    const response = await api.check();
    dispatch({ type: CHECK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CHECK_FAILURE, payload: error });
    checkOut();
  } finally {
    finish_loading(CHECK_LOADING);
    return;
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await api.logout();
    dispatch({ type: LOGOUT, payload: response.data });
    checkOut();
  } catch (error) {
    console.log(error);
  } finally {
    return;
  }
};

const initialState = {
  user: null,
  checkError: null,
};

const user = handleActions(
  {
    [SET_USER]: (state, { user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: checkError }) => ({
      ...state,
      user: null,
      checkError,
    }),
    [LOGOUT]: (state, { payload: user, checkError }) => ({
      ...state,
      user: null, // 사용자 정보 초기화
      checkError: null,
    }),
  },
  initialState
);

export default user;
