/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  SET_LOADING_APP = "boilerplate/App/SET_LOADING_APP",
  SET_USER_APP = "boilerplate/App/SET_USER_APP"
}

export const {
  REACT_APP_PORT,
  REACT_APP_API_BASE_URL,
  REACT_APP_SOCKET_IO_SERVER,
  REACT_APP_SOCKET_PORT
} = process.env;
export const ACCESS_TOKEN_KEY = "access_token";
export default ActionTypes;
