import ActionTypes from "./constants";
import { ContainerState, ContainerActionsAndTypes } from "./types";

// The initial state of the App
export const initialState: ContainerState = {
  config: {
    open: false,
    variant: undefined,
    message: "",
    duration: 3000
  }
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function notiftReducer(
  state: ContainerState = initialState,
  action: ContainerActionsAndTypes
): ContainerState {
  switch (action.type) {
    case ActionTypes.SET_NOTIFICATION_CONFIG:
      return Object.assign({}, state, {
        config: action.payload
      });
    default:
      return state;
  }
}

export default notiftReducer;
