/**
 * Asynchronously loads the component for HomePage
 */

import * as React from "react";
import loadable from "../../utils/loadable";
import LoadingIndicator from "../../components/LoadingIndicator";
import CircularProgress from "@material-ui/core/CircularProgress";

export default loadable(() => import("./index"), {
  fallback: <CircularProgress />
});
