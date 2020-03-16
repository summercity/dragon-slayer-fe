import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {}

const useStyles = makeStyles(theme => ({
  loading: {
    width: 100,
    margin: "0 auto !important",
    color: "#0288d1"
  }
}));

const LoadingIndicator: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CircularProgress className={classes.loading} />
    </React.Fragment>
  );
};

export default LoadingIndicator;
