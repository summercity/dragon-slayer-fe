import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Online from "@material-ui/icons/RecordVoiceOver";
import Offline from "@material-ui/icons/VoiceOverOff";
import Notified from "@material-ui/icons/NotificationsActive";
import Attending from "@material-ui/icons/People";
import Grid from "@material-ui/core/Grid";

interface Props {}

const useStyles = makeStyles(theme => ({
  paper: {
    // maxWidth: 500,
    margin: 20,
    padding: 20
  },
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

const StatusLegend: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Online className={classes.Online} />
            <div>Available</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <Offline className={classes.Offline} />
            <div>Offline</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <Notified className={classes.Notified} />
            <div>Notified</div>
          </Grid>
          <Grid item xs={12} md={3}>
            <Attending className={classes.Attending} />
            <div>Attending</div>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default memo(StatusLegend);
