import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */

interface DefaultState {
  config: NotifCogfig;
}

interface NotifCogfig {
  open: boolean;
  variant: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  duration: number;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = DefaultState;
type ContainerActionsAndTypes = AppActions;

interface ContainerActions {
  setNotification: (config: NotifCogfig) => void;
}

export {
  RootState,
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  NotifCogfig
};
