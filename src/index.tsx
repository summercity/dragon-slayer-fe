import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
// import { createStore } from "redux";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import configureStore from "./configureStore";

import history from "../src/utils/history";
// import createReducer from "./reducers";

// Wihtout Store Config // with dev tools
// const store = createStore(
//   createReducer(),
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__()
// );

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
