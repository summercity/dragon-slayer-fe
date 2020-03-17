import ActionTypes from "./constants";
import {
  ContainerState,
  ContainerActionsAndTypes
  // UserInterface
} from "./types";

// The initial state of the App
export const initialState: ContainerState = {
  allUsers: [],
  singleUser: {
    name: "",
    email: "",
    computer_number: "",
    password: "",
    password_confirmation: "",
    active: true,
    online: 0,
    status_description: ""
  }
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function usersReducer(
  state: ContainerState = initialState,
  action: ContainerActionsAndTypes
): ContainerState {
  switch (action.type) {
    case ActionTypes.SET_SINGLE_USER:
      return Object.assign({}, state, {
        singleUser: action.payload
      });
    default:
      return state;
  }
}

export default usersReducer;
