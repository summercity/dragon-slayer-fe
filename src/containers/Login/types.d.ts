import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */

interface DefaultState {
  readonly fullname: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = DefaultState;
type ContainerActionsAndTypes = AppActions;
type LoginPayload = UserLogin;

interface ContainerActions {
  submitLogin: (payload: UserLogin) => void;
}

interface UserLogin {
  email: string;
  password: string;
}

export {
  RootState,
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  LoginPayload
};
