import React, { memo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";

import { makeSelectLoading } from "../App/selectors";
import Avatar from "../../components/Avatar";
import { ACCESS_TOKEN_KEY } from "../../containers/App/constants";
import { getItem } from "../../utils/localStorage";
import { updateUserAction } from "../Queue/actions";
import { UserInterface } from "../Users/types";
import {
  ContainerActionsAndTypes,
  ContainerActions as QueueInterface
} from "../Queue/types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  }
}));

interface DesiredSelection {}

interface ToLocalProps extends QueueInterface {
  loading: boolean;
}

function ButtonAppBar(props: ToLocalProps) {
  const classes = useStyles();
  const { updateUser } = props;

  const json = getItem(ACCESS_TOKEN_KEY);
  const access = json !== null ? JSON.parse(json) : "";

  const handleQueueLogOut = () => {
    const user: Partial<UserInterface> = {};
    user.id = access.user.id;
    user.status_description = "Logged Out";
    updateUser(user);
  };

  return (
    <div className={classes.root}>
      {props.loading ? <LinearProgress /> : ""}
      {access && access.authenticated ? (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Q-APP
            </Typography>
            <Avatar
              fullName={access.user.name}
              logOutAction={handleQueueLogOut}
            />
          </Toolbar>
        </AppBar>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector<
  ToLocalProps,
  DesiredSelection
>({
  loading: makeSelectLoading()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    updateUser: (user: Partial<UserInterface>) =>
      dispatch(updateUserAction(user))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ButtonAppBar);
