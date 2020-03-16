import { action } from "typesafe-actions";
// import { } from './types';

import ActionTypes from "./constants";

export const changeFullname = (name: string) =>
  action(ActionTypes.CHANGE_FULLNAME, name);
