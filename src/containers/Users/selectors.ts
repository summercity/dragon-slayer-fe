import { createSelector } from "reselect";
import { ApplicationRootState } from "../../types";
import { initialState } from "./reducer";

/**
 * Direct selector to the testContainer state domain
 */

const selectDefaultDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Users
 */

const makeSelectUsers = () =>
  createSelector(selectDefaultDomain, substate => {
    return substate.users;
  });

const selectSingleUser = () =>
  createSelector(selectDefaultDomain, substate => {
    return substate.users.singleUser;
  });

export default makeSelectUsers;
export { selectDefaultDomain, selectSingleUser };
