import { action } from "typesafe-actions";
import { PlayerIterface, DragonIterface } from "./types";

import ActionTypes from "./constants";

// Player
export const castSkillPlayerAction = (payload: Partial<PlayerIterface>) =>
  action(ActionTypes.CAST_PLAYER_SKILL, payload);

export const setPlayerAction = (payload: PlayerIterface) =>
  action(ActionTypes.SET_PLAYER_ACTION, payload);

export const castSkillDragonAction = (payload: Partial<DragonIterface>) =>
  action(ActionTypes.CAST_DRAGON_SKILL, payload);

export const setDragonAction = (payload: DragonIterface) =>
  action(ActionTypes.SET_DRAGON_ACTION, payload);
