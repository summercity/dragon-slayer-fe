/**
 * Users Saga
 */

import { all, fork, call, put, select, takeLatest } from "redux-saga/effects";
import { push } from "react-router-redux";

import { setSingleUserAction, setAllUsersAction } from "./actions";
import { setLoadingAppAction } from "../App/action";
import { setNotifConfigAction } from "../Notifications/actions";

import { selectNotif } from "../../containers/App/selectors";
import ActionTypes from "../Users/constants";
import request from "../../utils/request";
import { getItem } from "../../utils/localStorage";

import {
  REACT_APP_API_BASE_URL,
  ACCESS_TOKEN_KEY
} from "../../containers/App/constants";

export function* addUser(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload } = args;
  const { saving, offline } = yield select(selectNotif());

  try {
    const json = getItem(ACCESS_TOKEN_KEY);
    const { token } = json !== null ? JSON.parse(json) : "";

    const req = yield call(request, `${REACT_APP_API_BASE_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(payload),
      token
    });

    const { user } = req;
    yield put(setNotifConfigAction(saving));
    yield put(push(`/users/form/${user.id}`));
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

export function* get(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload } = args;
  const { offline } = yield select(selectNotif());
  try {
    const json = getItem(ACCESS_TOKEN_KEY);
    const { token } = json !== null ? JSON.parse(json) : "";

    const user = yield call(
      request,
      `${REACT_APP_API_BASE_URL}/api/users/${payload}`,
      {
        method: "GET",
        token
      }
    );

    const { data: singleUser } = user;
    singleUser.password_confirmation = singleUser.password;
    yield put(setSingleUserAction(singleUser));
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

export function* getAll(args: any) {
  yield put(setLoadingAppAction(true));
  const { offline } = yield select(selectNotif());
  try {
    const json = getItem(ACCESS_TOKEN_KEY);
    const { token } = json !== null ? JSON.parse(json) : "";

    const user = yield call(request, `${REACT_APP_API_BASE_URL}/api/users`, {
      method: "GET",
      token
    });

    const { data: singleUser } = user;
    singleUser.password_confirmation = singleUser.password;
    yield put(setAllUsersAction(singleUser));
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

export function* updateUser(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload } = args;
  const { saving, offline } = yield select(selectNotif());

  try {
    const json = getItem(ACCESS_TOKEN_KEY);
    const { token } = json !== null ? JSON.parse(json) : "";

    yield call(request, `${REACT_APP_API_BASE_URL}/api/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      token
    });

    yield put(setNotifConfigAction(saving));
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */

export function* watchCreateUserSaga() {
  yield takeLatest(ActionTypes.ADD_USER, addUser);
}

export function* watchUpdateUserSaga() {
  yield takeLatest(ActionTypes.UPDATE_USER, updateUser);
}

export function* watchGetUserSaga() {
  yield takeLatest(ActionTypes.GET_USER, get);
}

export function* watchGetAllUsersSaga() {
  yield takeLatest(ActionTypes.GET_ALL_USERS, getAll);
}

export default function* usersSaga() {
  yield all([
    fork(watchCreateUserSaga),
    fork(watchUpdateUserSaga),
    fork(watchGetUserSaga),
    fork(watchGetAllUsersSaga)
  ]);
}
