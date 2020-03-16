import { action } from "typesafe-actions";
import { NotifCogfig } from "./types";

import ActionTypes from "./constants";

export const setNotifConfigAction = (config: NotifCogfig) =>
  action(ActionTypes.SET_NOTIFICATION_CONFIG, config);
