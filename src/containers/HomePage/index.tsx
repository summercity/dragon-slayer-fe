import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector, connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";

import saga from "./saga";
import { changeFullname } from "./actions";
import makeSelectHomePageContainer from "./selectors";

import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
} from "./types";
import { ApplicationRootState } from "../../types";
import logo from "./logo.svg";
import "./HomePage.css";

interface DesiredSelection {}

interface Props extends ContainerActions {
  home: ContainerState;
}
// const stateSelector = createStructuredSelector({
//   loading: makeSelectLoading()
// });

const HomePage: React.FC<Props> = props => {
  // function HomePage(props: Props) {
  // const { fullname } = useSelector(stateSelector);
  // const dispatch = useDispatch();

  // useInjectReducer({ key: "home", reducer: reducer }); // Initial State not working
  useInjectSaga({ key: "home", saga: saga });

  const handleClickUpdateSteAction = () => {
    // console.log("click!", home.fullname);
    // dispatch(changeFullname("Awesome Jan Dave!!!"));
    props.changeFullname("Awesome Jan Dave Arce");
  };

  return (
    <div className="HomePage">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate by Jan Dave Arce"
      >
        <meta name="description" content="A React.js Boilerplate Application" />
      </Helmet>
      <header className="HomePage-header">
        <img src={logo} className="HomePage-logo" alt="logo" />
        <p>{props.home.fullname}</p>
        <a
          className="HomePage-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <button onClick={handleClickUpdateSteAction}>Update State</button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  ApplicationRootState,
  DesiredSelection
>({
  home: makeSelectHomePageContainer()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    changeFullname: (payload: string) => dispatch(changeFullname(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
