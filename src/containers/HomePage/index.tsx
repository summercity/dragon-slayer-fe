import React, { memo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Paper from "@material-ui/core/Paper";
import { compose, Dispatch } from "redux";
import { makeStyles } from "@material-ui/core/styles";

import Arena from "../Arena/Loadable";
import { changeFullname } from "./actions";
import makeSelectHomePageContainer from "./selectors";

// import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
} from "./types";
import { ApplicationRootState } from "../../types";
import "./HomePage.css";

interface DesiredSelection {}

interface Props extends ContainerActions {
  home: ContainerState;
}

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 20,
    padding: 20
  }
}));

const HomePage: React.FC<Props> = props => {
  const classes = useStyles();

  useEffect(() => {
    console.log(
      "%c STOP! Report To: Jan Dave Arce",
      "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
    );
  }, []);

  return (
    <div className="HomePage">
      <Helmet titleTemplate="Q-APP" defaultTitle="Q-APP">
        <meta name="description" content="Q-APP" />
      </Helmet>
      <Paper className={classes.paper}>
        <Arena />
      </Paper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  ApplicationRootState,
  DesiredSelection
>({
  home: makeSelectHomePageContainer()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    changeFullname: (payload: string) => dispatch(changeFullname(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
