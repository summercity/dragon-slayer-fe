/**
 * The global state selectors
 */

import { createSelector } from "reselect";
import { ApplicationRootState } from "../../types";

const selectGlobal = (state: ApplicationRootState) => {
  return state.global;
};

const selectRoute = (state: ApplicationRootState) => {
  return state.router;
};

const selectNotif = () =>
  createSelector(selectGlobal, subState => subState.notifications);

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.user);

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState => globalState.userData.repos);

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export {
  selectGlobal,
  selectNotif,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation
};
