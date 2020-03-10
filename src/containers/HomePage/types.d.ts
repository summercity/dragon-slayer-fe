import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */

interface HomeState {
  readonly fullname: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = HomeState;
type ContainerActionsAndTypes = AppActions;

interface ContainerActions {
  changeFullname: (fullname: string) => void;
}

export {
  RootState,
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
};
