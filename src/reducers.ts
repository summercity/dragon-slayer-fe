/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "../src/utils/history";
import globalReducer from "./containers/App/reducer";
import homeReducer from "./containers/HomePage/reducer";
import defaultReducer from "./containers/EmptyContainer/reducer";
import loginReducer from "./containers/Login/reducer";
import notiftReducer from "./containers/Notifications/reducer";
import usersReducer from "./containers/Users/reducer";
import queueReducer from "./containers/Queue/reducer";

// import languageProviderReducer from "containers/LanguageProvider/reducer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    home: homeReducer,
    default: defaultReducer,
    login: loginReducer,
    notification: notiftReducer,
    users: usersReducer,
    queue: queueReducer,
    // language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  });

  return rootReducer;
}
