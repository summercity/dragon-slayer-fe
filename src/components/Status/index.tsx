import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Online from "@material-ui/icons/RecordVoiceOver";
import Offline from "@material-ui/icons/VoiceOverOff";
import Notified from "@material-ui/icons/NotificationsActive";
import Attending from "@material-ui/icons/People";

interface Props {
  status: string;
}

const useStyles = makeStyles(theme => ({
  Online: {
    color: "#388e3c"
  },
  Offline: {
    color: "#9e9e9e"
  },
  Notified: {
    color: "#0288d1"
  },
  Attending: {
    color: "#ad1457"
  }
}));

const Status: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {props.status === "Available" && <Online className={classes.Online} />}
      {props.status === "Logged Out" && <Offline className={classes.Offline} />}
      {props.status === "Notified" && <Notified className={classes.Notified} />}
      {props.status === "Attending" && (
        <Attending className={classes.Attending} />
      )}
    </React.Fragment>
  );
};

export default Status;
