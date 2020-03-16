/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.containers.DefaultContainer";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Default"
  },
  scaffoldingHeader: {
    id: `${scope}.scaffolding.header`,
    defaultMessage: "This is the default Container"
  }
});
