import { action } from "typesafe-actions";
// import { ContainerState } from "./types";

import ActionTypes from "./constants";
import { UserInterface } from "../Users/types";

export const setLoadingAppAction = (payload: boolean) =>
  action(ActionTypes.SET_LOADING_APP, payload);

export const setUserApp = (payload: Partial<UserInterface>) =>
  action(ActionTypes.SET_USER_APP, payload);
