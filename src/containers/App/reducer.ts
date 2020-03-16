import { ContainerState, ContainerActions } from "./types";
import ActionTypes from "./constants";

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  user: {
    id: "",
    name: "",
    email: "",
    computer_number: "",
    password: "",
    password_confirmation: "",
    active: false,
    online: 0,
    status_description: ""
  },
  notifications: {
    saving: {
      open: true,
      variant: "success",
      message: "Saving process completed successfully.",
      duration: 3000
    },
    offline: {
      open: true,
      variant: "warning",
      message: "Unable to connect. Please check your network connection.",
      duration: 1000 * 10
    },
    invalidUser: {
      open: true,
      variant: "error",
      message: "You have entered your password or email incorrectly",
      duration: 1000 * 10
    }
  }
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState {
  switch (action.type) {
    case ActionTypes.SET_LOADING_APP:
      return Object.assign({}, state, {
        loading: action.payload
      });
    case ActionTypes.SET_USER_APP:
      return Object.assign({}, state, {
        user: action.payload
      });
    default:
      return state;
  }
}

export default appReducer;
