import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- Main --- */
interface Main {
  id?: string;
  name: string;
  email: string;
  computer_number: string;
  password: string;
  password_confirmation: string;
  active: boolean;
  online: number;
  status_description: string;
}

type UserId = string;

/* --- STATE --- */
interface DefaultState {
  readonly singleUser: Main;
  readonly allUsers: Main[];
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;
interface ContainerActions {
  addUser: (user: Main) => void;
  getUser: (id: UserId) => void;
  getAllUser: () => void;
  setSingleUser: (user: Partial<Main>) => void;
  updateUser: (user: Partial<Main>) => void;
}

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = DefaultState;
type ContainerActionsAndTypes = AppActions;
type UserInterface = Main;

interface;

export {
  RootState,
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  UserInterface,
  UserId
};
