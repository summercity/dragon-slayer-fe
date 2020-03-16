import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";
import { UserInterface } from "../Users/types";

/* --- STATE --- */

interface DefaultState {
  readonly queUsers: UserInterface[];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = DefaultState;
type ContainerActionsAndTypes = AppActions;

interface ContainerActions {
  getAllUsers: () => void;
  updateUser: (user: Partial<UserInterface>) => void;
}

export {
  RootState,
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
};
