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
  ADD_USER = "boilerplate/Users/ADD_USER",
  UPDATE_USER = "boilerplate/Users/UPDATE_USER",
  GET_USER = "boilerplate/Users/GET_USER",
  GET_ALL_USERS = "boilerplate/Users/GET_USER",

  SET_SINGLE_USER = "boilerplate/Users/SET_SINGLE_USER",
  SET_ALL_USERS = "boilerplate/Users/SET_ALL_USERS"
}

export default ActionTypes;
