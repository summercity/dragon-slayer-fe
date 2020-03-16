import { action } from "typesafe-actions";
import { UserInterface, UserId } from "./types";

import ActionTypes from "./constants";

export const addUserAction = (user: UserInterface) =>
  action(ActionTypes.ADD_USER, user);

export const getUserAction = (id: UserId) => action(ActionTypes.GET_USER, id);

export const getAllUsersAction = () => action(ActionTypes.GET_ALL_USERS);

export const updateUserAction = (user: Partial<UserInterface>) =>
  action(ActionTypes.UPDATE_USER, user);

export const setSingleUserAction = (user: Partial<UserInterface>) =>
  action(ActionTypes.SET_SINGLE_USER, user);

export const setAllUsersAction = (users: UserInterface[]) =>
  action(ActionTypes.SET_ALL_USERS, users);
