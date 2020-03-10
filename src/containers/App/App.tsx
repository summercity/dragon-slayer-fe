import React from "react";
import { Helmet } from "react-helmet";
import styled from "../../styles/styled-components";
import { Switch, Route } from "react-router-dom";

import HomePage from "../HomePage";
// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import logo from "./logo.svg";
import "./App.css";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta
          name="description"
          content="React.js typescript Boilerplate application by Jan Dave Arce"
        />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} /> */}
      </Switch>
      {/* <Footer /> */}
      {/* <GlobalStyle /> */}
    </AppWrapper>
  );
}
