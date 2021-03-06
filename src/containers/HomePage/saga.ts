/**
 * Test Saga
 */

import { call, put, select, takeLatest } from "redux-saga/effects";
import socketIOClient from "socket.io-client";
// import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import ActionTypes from "../HomePage/constants";

// import request from 'utils/request';
// import { makeSelectHomePageContainer } from '../HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* updateFullname() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    // yield put(reposLoaded(repos, username));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ActionTypes.CHANGE_FULLNAME, updateFullname);
}
