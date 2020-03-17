import React, { memo, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";
import { History } from "history";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Notif from "@material-ui/icons/WbIncandescent";
import Attending from "@material-ui/icons/People";
import Online from "@material-ui/icons/RecordVoiceOver";
import Offline from "@material-ui/icons/VoiceOverOff";
import AddUser from "@material-ui/icons/PersonAdd";

import {
  REACT_APP_SOCKET_IO_SERVER,
  REACT_APP_SOCKET_PORT,
  ACCESS_TOKEN_KEY
} from "../../containers/App/constants";
import { getItem } from "../../utils/localStorage";
import Status from "../../components/Status";
import saga from "./saga";
import { getAllUsersAction, updateUserAction } from "./actions";
import { UserInterface } from "../Users/types";

import makeSelectQueueUsers from "./selectors";
import { makeSelectCurrentUser } from "../App/selectors";

import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
} from "./types";
import { ApplicationRootState } from "../../types";

interface RootState extends ApplicationRootState {
  user: UserInterface;
  history: History;
}
interface DesiredSelection {}
interface Props extends ContainerActions, ContainerState, RootState {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  userList: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 600
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  listItem: {
    "&:hover": {
      background: "#F8F8F8",
      cursor: "pointer"
    }
  },
  Notif: {
    color: "#ffc400",
    fontSize: 100
  },
  Attending: {
    color: "#ad1457",
    fontSize: 100
  },
  Online: {
    color: "#388e3c",
    fontSize: 100
  },
  Offline: {
    color: "#9e9e9e",
    fontSize: 100
  },
  AddUser: {
    cursor: "pointer"
  },
  AccountCircle: {
    color: "#ff5722"
  }
}));

const Queue: React.FC<Props> = props => {
  useInjectSaga({ key: "queue", saga: saga });
  const { queUsers, updateUser, getAllUsers, user, history } = props;
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(true);

  const json = getItem(ACCESS_TOKEN_KEY);
  const localUser = json !== null ? JSON.parse(json) : "";
  let watchedLocalUser = queUsers.find(x => x.id === localUser.user.id);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    user.status_description === "Logged Out" && updateStatus("Available");
  }, [user.status_description]); // eslint-disable-line

  useEffect(() => {
    // connect to the socket
    const socket = socketIOClient(
      `${REACT_APP_SOCKET_IO_SERVER}:${REACT_APP_SOCKET_PORT}`
    );

    // Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one.
    socket.on("outgoing data", (data: any) => {
      const { onQappUsers } = data.changes;
      if (onQappUsers === "status") {
        getAllUsers();
      }
    });
  }, [getAllUsers]);

  const updateStatus = (status: string) => {
    user.id = localUser.user.id;
    user.status_description = status;
    updateUser(user);
  };

  const handleClickAccept = () => {
    // user.id = localUser.user.id;
    // user.status_description = "Attending";
    // updateUser(user);
    updateStatus("Attending");
  };

  const handleClickNotify = (userItem: UserInterface) => {
    if (userItem.status_description === "Available") {
      const u: Partial<UserInterface> = {
        id: userItem.id,
        status_description: "Notified"
      };
      updateUser(u);
    }
  };

  const handleClickBeAvailable = () => {
    if (user.status_description !== "Available") {
      // user.id = localUser.user.id;
      // user.status_description = "Available";
      // updateUser(user);
      updateStatus("Available");
    }
  };

  const handleClickToEdit = (userId?: string) => {
    history.push(`/users/form/${userId}`);
  };

  return (
    <div className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={event => setDense(event.target.checked)}
              value="dense"
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={event => setSecondary(event.target.checked)}
              value="secondary"
            />
          }
          label="Show user status"
        />
      </FormGroup>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            <a href="/users/form" style={{ color: "inherit" }}>
              <AddUser className={classes.AddUser} />
            </a>
            Users
          </Typography>
          <div className={classes.userList}>
            <List dense={dense}>
              {queUsers.map(item => (
                <ListItem key={item.id} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle
                        className={classes.AccountCircle}
                        onClick={() => handleClickToEdit(item.id)}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ width: 400 }}
                    primary={item.name}
                    secondary={secondary ? `${item.status_description}` : null}
                  />
                  <ListItemText
                    secondary={
                      secondary ? `Computer #: ${item.computer_number}` : null
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="status"
                      onClick={() => handleClickNotify(item)}
                    >
                      <Status status={item.status_description} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Notifications and Status
          </Typography>
          {
            // Todo: Ooops!!!-JDA Convert this to a component ^_^ --
          }
          {watchedLocalUser &&
            watchedLocalUser.status_description === "Notified" && (
              <div>
                <Notif className={classes.Notif} />
                <div>Customer is waiting for your response!</div>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: 10 }}
                    onClick={handleClickAccept}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            )}
          {watchedLocalUser &&
            watchedLocalUser.status_description === "Attending" && (
              <div>
                <Attending className={classes.Attending} />
                <div>Attending customer...</div>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: 10 }}
                    onClick={handleClickBeAvailable}
                  >
                    I am available now.
                  </Button>
                </div>
              </div>
            )}
          {watchedLocalUser &&
            watchedLocalUser.status_description === "Available" && (
              <div>
                <Online className={classes.Online} />
                <div>Available</div>
              </div>
            )}
          {watchedLocalUser &&
            watchedLocalUser.status_description === "Logged Out" && (
              <div>
                <Offline className={classes.Offline} />
                <div>Logged Out</div>
              </div>
            )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<RootState, DesiredSelection>({
  queUsers: makeSelectQueueUsers(),
  user: makeSelectCurrentUser()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    getAllUsers: () => dispatch(getAllUsersAction()),
    updateUser: (user: Partial<UserInterface>) =>
      dispatch(updateUserAction(user))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, withRouter)(Queue);
