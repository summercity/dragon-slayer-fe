import ActionTypes from "./constants";
import { ContainerState, ContainerActionsAndTypes } from "./types";

// The initial state of the App
export const initialState: ContainerState = {
  fullname: "Jan Dave Arce"
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function defaultReducer(
  state: ContainerState = initialState,
  action: ContainerActionsAndTypes
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANGE_FULLNAME:
      return {
        // Delete prefixed '@' from the fullname
        fullname: action.payload.replace(/@/gi, "")
      };
    default:
      return state;
  }
}

export default defaultReducer;
