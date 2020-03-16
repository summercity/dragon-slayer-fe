import { action } from "typesafe-actions";
import { LoginPayload } from "./types";

import ActionTypes from "./constants";

export const submitLoginAction = (payload: LoginPayload) =>
  action(ActionTypes.SUBMIT_LOGIN, payload);

// export function setApiResponseAction(res) {
//   return {
//     type: SET_API_RESPONSE_ACTION,
//     res,
//   };
// }
