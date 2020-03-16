import { action } from "typesafe-actions";
// import { } from './types';
import { UserInterface } from "../Users/types";
import ActionTypes from "./constants";

export const getAllUsersAction = () => action(ActionTypes.GET_ALL_USERS);

export const updateUserAction = (user: Partial<UserInterface>) =>
  action(ActionTypes.UPDATE_QUE_USER, user);

export const setQueUsersAction = ({
  queUsers
}: {
  queUsers: UserInterface[];
}) => action(ActionTypes.SET_QUE_USERS, queUsers);
