import { createSelector } from "reselect";
import { ApplicationRootState } from "../../types";
import { initialState } from "./reducer";

/**
 * Direct selector to the testContainer state domain
 */

const selectHomePageDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by TestContainer
 */

const makeSelectHomePageContainer = () =>
  createSelector(selectHomePageDomain, substate => {
    return substate.home;
  });

export default makeSelectHomePageContainer;
export { selectHomePageDomain };
