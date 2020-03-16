import React, { memo, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";

import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import saga from "./saga";
import {
  addUserAction,
  getUserAction,
  setSingleUserAction,
  updateUserAction
} from "./actions";
import { selectSingleUser } from "./selectors";

import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  UserInterface,
  UserId
} from "./types";
import { ApplicationRootState } from "../../types";

interface DesiredSelection {}
interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}
interface Props extends ContainerActions, MatchProps {
  user: UserInterface;
}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      marginTop: 15,
      width: 200
    }
  },
  paper: {
    margin: 20,
    padding: 15
  },
  button: {
    marginTop: 25,
    marginLeft: 5
  }
}));

const UserForm: React.FC<Props> = props => {
  useInjectSaga({ key: "users", saga: saga });
  const classes = useStyles();
  const { user, addUser, updateUser } = props;
  const userId = props.match.params.id;

  const [state, setState] = React.useState(user);

  useEffect(() => {
    setState(user);
  }, [user]);

  const handleChangeInput = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (name === "active") {
      setState({ ...state, ["active"]: event.target.checked });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data: UserInterface) => {
    const payload = data;
    if (userId) {
      payload.id = userId;
      updateUser(payload);
    } else {
      payload.status_description = "Available";
      payload.online = 1;
      addUser(payload);
    }
  };
  const hasError = (inputName: string) => !!(errors && errors[inputName]);

  useEffect(() => {
    console.log("API CALL");
    userId && props.getUser(userId);
  }, [userId]);

  const back = () => {
    props.history.push("/");
  };

  const handleClickNewForm = () => {
    props.history.push("/users/form");
  };

  //# Check optimization #
  useEffect(() => console.log("rendered!"));

  return (
    <div>
      <Helmet titleTemplate="Q-APP" defaultTitle="Q-APP- User Form">
        <meta name="description" content="A React.js Boilerplate Application" />
      </Helmet>
      <Paper className={classes.paper}>
        <h3 style={{ marginLeft: 10 }}>
          {userId ? "Update User" : "Add User"}
        </h3>
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              id="name"
              name="name"
              inputRef={register({ required: true })}
              label="Name"
              variant="outlined"
              error={hasError("name")}
              helperText={hasError("name") && "Name is required"}
              onChange={handleChangeInput("name")}
              value={state.name}
            />
            <TextField
              id="email"
              name="email"
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              label="Email"
              variant="outlined"
              error={hasError("email")}
              helperText={hasError("email") && "Invalid email address"}
              onChange={handleChangeInput("email")}
              value={state.email}
            />
          </div>
          <div>
            <TextField
              id="computer_number"
              name="computer_number"
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[0-9]*$/i,
                  message: "Please enter a number only."
                }
              })}
              label="Computer number"
              variant="outlined"
              error={hasError("computer_number")}
              helperText={
                hasError("computer_number") && "Please enter a number only."
              }
              onChange={handleChangeInput("computer_number")}
              value={state.computer_number}
            />
          </div>
          <div>
            <TextField
              id="password"
              name="password"
              inputRef={register({ required: true })}
              label="Password"
              variant="outlined"
              error={hasError("password")}
              helperText={hasError("password") && "Password is required"}
              type="password"
              onChange={handleChangeInput("password")}
              value={state.password}
            />
            <TextField
              id="password_confirmation"
              name="password_confirmation"
              inputRef={register({
                required: true,
                validate: value => {
                  return value === watch("password");
                }
              })}
              label="Confirm Password"
              variant="outlined"
              error={hasError("password_confirmation")}
              helperText={
                hasError("password_confirmation") &&
                "The passwords do not match"
              }
              type="password"
              onChange={handleChangeInput("password_confirmation")}
              value={state.password_confirmation}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    name="active"
                    checked={Boolean(Number(state.active))}
                    onChange={handleChangeInput("active")}
                    value={Boolean(Number(state.active))}
                    color="primary"
                    inputRef={register()}
                  />
                }
                label={state.active ? "Active" : "Inactive"}
              />
            </FormGroup>
          </div>
          <div>
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              variant="contained"
            >
              {!userId ? "Submit" : "Save Changes"}
            </Button>

            <Button
              className={classes.button}
              color="default"
              variant="contained"
              onClick={back}
            >
              Back
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  ApplicationRootState,
  DesiredSelection
>({
  user: selectSingleUser()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    addUser: (user: UserInterface) => dispatch(addUserAction(user)),
    getUser: (id: UserId) => dispatch(getUserAction(id)),
    updateUser: (user: Partial<UserInterface>) =>
      dispatch(updateUserAction(user)),
    setSingleUser: (user: Partial<UserInterface>) =>
      dispatch(setSingleUserAction(user))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UserForm);
