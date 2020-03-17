import React from "react";
import { Helmet } from "react-helmet";
// import styled from "../../styles/styled-components";
import { Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../../components/ProtectedComponent/protected.route";
import Login from "../Login/Loadable";
import HomePage from "../HomePage";
import UserForm from "../Users/Loadable";
import AppBar from "../AppBar";
import Notifications from "../Notifications";

// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import "./App.css";

// const AppWrapper = styled.div`
//   font-family: arial;
// `;

export default function App() {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta
          name="description"
          content="React.js typescript Boilerplate application by Jan Dave Arce"
        />
      </Helmet>
      <Notifications />
      <AppBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <Route exact path="/users/form" component={UserForm} />
        <Route exact path="/users/form/:id" component={UserForm} />
        {/* <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} /> */}
      </Switch>
      {/* <Footer /> */}
      {/* <GlobalStyle /> */}
    </React.Fragment>
  );
}
