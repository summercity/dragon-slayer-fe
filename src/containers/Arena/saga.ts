/**
 * Test Saga
 */

import { all, fork, put, select, takeLatest } from "redux-saga/effects";
// import socketIOClient from "socket.io-client";
import { setPlayerAction, setDragonAction } from "./actions";
import ActionTypes from "./constants";
import makeSelectArena from "./selectors";
import { setLoadingAppAction } from "../App/action";
import { setNotifConfigAction } from "../Notifications/actions";

import { selectNotif } from "../App/selectors";
// import request from "../../utils/request";
// import { getItem } from "../../utils/localStorage";

// import {
//   REACT_APP_API_BASE_URL,
//   ACCESS_TOKEN_KEY,
//   REACT_APP_SOCKET_IO_SERVER,
//   REACT_APP_SOCKET_PORT
// } from "../App/constants";

export function* castSkillPlayer(args: any) {
  // yield put(setLoadingAppAction(true)); // not needed because the skill action already have casting boolean as indicator ^_^
  const { payload } = args;
  const { dragon: dragonState, player: playerState } = yield select(
    makeSelectArena()
  );

  const { offline } = yield select(selectNotif());
  try {
    // TODO
    // const json = getItem(ACCESS_TOKEN_KEY);
    // const { token } = json !== null ? JSON.parse(json) : "";

    // const users = yield call(request, `${REACT_APP_API_BASE_URL}/api/arena/player/action`, {
    //   method: "GET",
    //   token
    // });

    const player = {
      ...payload,
      casting: false,
      skill: "stop",
      hp: playerState.hp
    };

    const dragon = {
      ...dragonState,
      hp: dragonState.hp - payload.damage
    };

    // MOCKING API CALL FOR NOW
    yield sleep(500); // MOCK API CALL RESPONSE TIME
    yield put(setPlayerAction(player));
    yield put(setDragonAction(dragon));
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

export function* castSkillDragon(args: any) {
  const { payload } = args;
  const { player: playerState, dragon: dragonState } = yield select(
    makeSelectArena()
  );

  const { offline } = yield select(selectNotif());

  try {
    if (dragonState.hp && dragonState.hp > 0) {
      const dragon = {
        ...payload,
        casting: false,
        skill: "stop",
        hp: dragonState.hp
      };

      const player = {
        ...playerState,
        hp: playerState.hp - payload.damage
      };

      // MOCKING API CALL FOR NOW
      // yield sleep(1000); // MOCK API CALL RESPONSE TIME
      yield put(setDragonAction(dragon));
      yield put(setPlayerAction(player));
    }

    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    if (!error.response) {
      yield put(setNotifConfigAction(offline));
    }
  }
}

function* sleep(time: number) {
  yield new Promise(resolve => setTimeout(resolve, time));
}

export function* watchCastPlayerSkillSaga() {
  yield takeLatest(ActionTypes.CAST_PLAYER_SKILL, castSkillPlayer);
}

export function* watchCastDragonSkillSaga() {
  yield takeLatest(ActionTypes.CAST_DRAGON_SKILL, castSkillDragon);
}
export default function* queuingSaga() {
  yield all([fork(watchCastPlayerSkillSaga), fork(watchCastDragonSkillSaga)]);
}
