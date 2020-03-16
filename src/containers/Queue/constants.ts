/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

enum ActionTypes {
  DEFAULT = "boilerplate/Queuing/DEFAULT",
  GET_ALL_USERS = "boilerplate/Queuing/GET_ALL_USERS",
  UPDATE_QUE_USER = "boilerplate/Queuing/UPDATE_QUE_USER",
  SET_QUE_USERS = "boilerplate/Queuing/SET_QUE_USERS"
}

export default ActionTypes;
