import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { clear } from "../../utils/localStorage";

interface Props {
  fullName: string;
  logOutAction: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    },
    "MuiButton-label": {
      color: "#fff !important"
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  firstName: {
    marginTop: 10
  },
  button: {
    color: "#fff"
  }
}));

export default function LetterAvatars(props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    await props.logOutAction();
    await clear();
    setAnchorEl(null);
    document.location.href = "/login";
  };
  return (
    <div className={classes.root}>
      <Avatar className={classes.orange}>{props.fullName.charAt(0)}</Avatar>{" "}
      <div className={classes.firstName}>
        <Button
          className={classes.button}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {props.fullName}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
