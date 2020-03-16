import ActionTypes from "./constants";
import { ContainerState, ContainerActionsAndTypes } from "./types";

// The initial state of the App
export const initialState: ContainerState = {
  queUsers: []
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function queuingReducer(
  state: ContainerState = initialState,
  action: ContainerActionsAndTypes
): ContainerState {
  switch (action.type) {
    case ActionTypes.SET_QUE_USERS:
      return Object.assign({}, state, {
        queUsers: action.payload
      });
    default:
      return state;
  }
}

export default queuingReducer;
