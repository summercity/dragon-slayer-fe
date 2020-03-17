import React, { memo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
// import { makeStyles, Theme } from "@material-ui/core/styles";

// import saga from "./saga";
import { setNotifConfigAction } from "./actions";
import makeSelectNotifications from "./selectors";

// import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  NotifCogfig
} from "./types";
import { ApplicationRootState } from "../../types";

interface DesiredSelection {}

interface Props extends ContainerActions {
  notification: ContainerState;
}

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2)
//     }
//   }
// }));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notifications: React.FC<Props> = props => {
  // useInjectSaga({ key: "default", saga: saga });
  // const classes = useStyles();
  const { config } = props.notification;

  //# this was converted to a Global Notification / Use this for debugging Only. #
  // const [open, setOpen] = React.useState(false);
  // const handleClick = () => {
  //   // setOpen(true);
  // };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    // setOpen(false); Todo: Change this to Global Method
    props.setNotification({
      open: false,
      variant: config.variant,
      message: "",
      duration: 1000
    });
  };

  return (
    <div>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={config.open}
        onClose={handleClose}
        autoHideDuration={config.duration}
        message={config.message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              CLOSE
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      /> */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={config.open}
        autoHideDuration={config.duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={config.variant}>
          {config.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  ApplicationRootState,
  DesiredSelection
>({
  notification: makeSelectNotifications()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    setNotification: (payload: NotifCogfig) =>
      dispatch(setNotifConfigAction(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Notifications);
