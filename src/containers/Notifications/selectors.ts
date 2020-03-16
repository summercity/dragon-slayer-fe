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
 * Default selector used by TestContainer
 */

const makeSelectDefaultContainer = () =>
  createSelector(selectDefaultDomain, substate => {
    return substate.notification;
  });

export default makeSelectDefaultContainer;
export { selectDefaultDomain };
