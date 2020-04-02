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
import { getItem } from "../../utils/localStorage";

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

    // Heal / random 1-10
    const heal = Math.floor(Math.random() * 10);

    // Default state action
    const action = {
      ...playerState,
      skill: "stop"
    };

    // Set default
    yield put(setPlayerAction(action));

    // ### Cast skill base on action ###
    if (payload.skill === "attack") {
      action.skill = payload.skill;
      action.casting = true;
      // attack dragon
      // MOCKING API CALL FOR NOW
      yield sleep(1000); // MOCK API CALL RESPONSE TIME
      const dragon = {
        ...dragonState,
        hp: dragonState.hp - payload.damage
      };
      yield put(setDragonAction(dragon));
      // attack end
    } else if (payload.skill === "heal") {
      action.skill = payload.skill;
      action.casting = true;
      let totalHp = action.hp + heal;

      // Max HP to 50
      if (totalHp > 50) {
        totalHp = 50;
      }
      // attack dragon
      // MOCKING API CALL FOR NOW
      yield sleep(1000); // MOCK API CALL RESPONSE TIME
      action.hp = totalHp;
      yield put(setPlayerAction(action));
    }

    // set to initial action
    action.skill = "stop";
    action.casting = false;
    yield put(setPlayerAction(action));
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
    const j = getItem("match");
    const match = j !== null ? JSON.parse(j) : {};

    if (dragonState.hp && dragonState.hp > 0) {
      const player = {
        ...playerState,
        hp: playerState.hp - payload.damage
      };

      // MOCKING API CALL FOR NOW
      // yield sleep(1000); // MOCK API CALL RESPONSE TIME

      yield put(setPlayerAction(player));
    }

    if (Math.sign(playerState.hp) === -1 || Math.sign(dragonState.hp) === -1) {
      clearInterval(match.matchId);
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
