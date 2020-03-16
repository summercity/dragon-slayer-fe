import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { Repo } from "../RepoListItem/types";
import { ApplicationRootState } from "../../types";
import { UserInterface } from "../Users/types";

/* --- STATE --- */
interface AppState {
  loading: boolean;
  error?: object | boolean;
  user: UserInterface;
  notifications: {
    saving: {
      open: boolean;
      variant: string;
      message: string;
      duration: number;
    };
    offline: {
      open: boolean;
      variant: string;
      message: string;
      duration: number;
    };
    invalidUser: {
      open: boolean;
      variant: string;
      message: string;
      duration: number;
    };
  };
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions, UserData };
