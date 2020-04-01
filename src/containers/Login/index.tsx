import React, { memo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";
import { History } from "history";

import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

import saga from "./saga";
import { submitLoginAction } from "./actions";
import { makeSelectLoading } from "../App/selectors";

import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  LoginPayload
} from "./types";
import "./Login.css";
import { ApplicationRootState } from "../../types";
import { ACCESS_TOKEN_KEY } from "../../containers/App/constants";
import { getItem } from "../../utils/localStorage";

interface DesiredSelection {}

interface Props extends ContainerActions {
  loading: boolean;
  default: ContainerState;
  history: History;
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "600px",
    maxHeight: 300,
    margin: "0 auto",
    padding: 30
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  paper: {
    background: "#fff",
    paddingRight: 20
  },
  textField: {
    width: "100%",
    marginTop: 20
  },
  button: {
    width: "200px",
    margin: 10
  },
  title: {
    maxWidth: 200,
    margin: "0 auto",
    fontWeight: 700,
    fontSize: 18,
    padding: 10
  }
}));

const Login: React.FC<Props> = props => {
  useInjectSaga({ key: "login", saga: saga });
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false
  });

  useEffect(() => {
    const json = getItem(ACCESS_TOKEN_KEY);
    const access = json !== null ? JSON.parse(json) : "";
    if (access && access.authenticated) {
      props.history.push("/");
    }
  }, [props.history]);

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClickSubmitLogin = () => {
    const payload: LoginPayload = {
      email: values.email,
      password: values.password
    };
    props.submitLogin(payload);
  };

  const handleClickSignUp = () => {
    props.history.push("/users/form");
  };

  return (
    <div className="Login">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="Dragon Slayer - JDA"
      >
        <meta name="description" content="React boilerplate by Jan Dave arce" />
      </Helmet>
      <div className={classes.root}>
        {props.loading ? <LinearProgress /> : ""}
        <Paper className={classes.paper}>
          <div className={classes.title}>Dragon Slayer</div>
          <form noValidate autoComplete="off">
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <TextField
                className={classes.textField}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={values.email}
                onChange={handleChange("email")}
              />
            </FormControl>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleClickSubmitLogin}
            >
              Login
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleClickSignUp}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  ApplicationRootState,
  DesiredSelection
>({
  loading: makeSelectLoading()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    submitLogin: (payload: LoginPayload) => dispatch(submitLoginAction(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Login);
