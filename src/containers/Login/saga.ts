/**
 * Test Saga
 */

import { all, fork, call, put, select, takeLatest } from "redux-saga/effects";
import { push } from "react-router-redux";

import { setLoadingAppAction, setUserApp } from "../App/action";
import { setNotifConfigAction } from "../Notifications/actions";

import { selectNotif } from "../../containers/App/selectors";
import ActionTypes from "../Login/constants";
import request from "../../utils/request";
import { setItem } from "../../utils/localStorage";
import {
  REACT_APP_API_BASE_URL,
  ACCESS_TOKEN_KEY
} from "../../containers/App/constants";

// import request from 'utils/request';
// import { makeSelectHomePageContainer } from '../HomePage/selectors';

export function* submitLogin(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload } = args;
  const { offline, invalidUser } = yield select(selectNotif());

  const errors = {};
  try {
    const req = yield call(request, `${REACT_APP_API_BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const { user, token, authenticated } = req;
    const res = { user, token, authenticated, errors };
    yield put(setUserApp(user));
    yield call(setItem, ACCESS_TOKEN_KEY, JSON.stringify(res));
    yield put(setLoadingAppAction(false));
    yield put(push("/"));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    } else {
      yield put(setNotifConfigAction(invalidUser));
    }
  }
}

export function* watchSubmitLoginSaga() {
  yield takeLatest(ActionTypes.SUBMIT_LOGIN, submitLogin);
}

export default function* loginSaga() {
  yield all([fork(watchSubmitLoginSaga)]);
}
