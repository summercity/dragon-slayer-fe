import ActionTypes from "./constants";
import { ContainerState, ContainerActionsAndTypes } from "./types";

// The initial state of the App
export const initialState: ContainerState = {
  player: {
    casting: false,
    skill: "stop",
    damage: 1,
    hp: 50
  },
  dragon: {
    casting: false,
    skill: "stop",
    damage: 1,
    hp: 50
  }
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function arenaReducer(
  state: ContainerState = initialState,
  action: ContainerActionsAndTypes
): ContainerState {
  switch (action.type) {
    // case ActionTypes.CAST_PLAYER_SKILL:
    //   return Object.assign({}, state, {
    //     player: action.payload
    //   });
    case ActionTypes.SET_PLAYER_ACTION:
      return Object.assign({}, state, {
        player: action.payload
      });

    case ActionTypes.SET_DRAGON_ACTION:
      return Object.assign({}, state, {
        dragon: action.payload
      });
    default:
      return state;
  }
}

export default arenaReducer;
