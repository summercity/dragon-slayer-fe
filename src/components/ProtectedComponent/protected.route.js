import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../../containers/App/constants";
import { getItem } from "../../utils/localStorage";

export const ProtectedRoute = ({ component: Componnent, ...rest }) => {
  const access = JSON.parse(getItem(ACCESS_TOKEN_KEY));
  return (
    <Route
      {...rest}
      render={props => {
        if (access && access.authenticated) {
          return <Componnent {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
