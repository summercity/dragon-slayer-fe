/**
 * Test Saga
 */

import { all, fork, call, put, select, takeLatest } from "redux-saga/effects";
import socketIOClient from "socket.io-client";
import { setQueUsersAction } from "./actions";
import ActionTypes from "./constants";
import { setLoadingAppAction } from "../App/action";
import { setNotifConfigAction } from "../Notifications/actions";

import { selectNotif } from "../App/selectors";
import request from "../../utils/request";
import { getItem } from "../../utils/localStorage";

import {
  REACT_APP_API_BASE_URL,
  ACCESS_TOKEN_KEY,
  REACT_APP_SOCKET_IO_SERVER,
  REACT_APP_SOCKET_PORT
} from "../App/constants";

export function* getAll() {
  yield put(setLoadingAppAction(true));
  const { offline } = yield select(selectNotif());
  try {
    const json = getItem(ACCESS_TOKEN_KEY);
    const { token } = json !== null ? JSON.parse(json) : "";

    const users = yield call(request, `${REACT_APP_API_BASE_URL}/api/users`, {
      method: "GET",
      token
    });

    const { data: queUsers } = users;
    yield put(setQueUsersAction({ queUsers }));
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

export function* update(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload } = args;
  const { saving, offline } = yield select(selectNotif());

  try {
    const json = getItem(ACCESS_TOKEN_KEY);
    const { token } = json !== null ? JSON.parse(json) : "";

    yield call(
      request,
      `${REACT_APP_API_BASE_URL}/api/users/status/${payload.id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        token
      }
    );

    const socket = socketIOClient(
      `${REACT_APP_SOCKET_IO_SERVER}:${REACT_APP_SOCKET_PORT}`
    );
    socket.emit("incoming data", { onQappUsers: "status" });

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

export function* watchUpdateQueUserSaga() {
  yield takeLatest(ActionTypes.UPDATE_QUE_USER, update);
}

export function* watchGetAllQueUsersSaga() {
  yield takeLatest(ActionTypes.GET_ALL_USERS, getAll);
}

export default function* queuingSaga() {
  yield all([fork(watchUpdateQueUserSaga), fork(watchGetAllQueUsersSaga)]);
}
