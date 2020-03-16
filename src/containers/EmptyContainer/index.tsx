import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";

import messages from "./messages";

import saga from "./saga";
import { changeFullname } from "./actions";
import makeSelectDefaultContainer from "./selectors";

import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
} from "./types";
import { ApplicationRootState } from "../../types";
import "./DefaultContainer.css";

interface DesiredSelection {}

interface Props extends ContainerActions {
  default: ContainerState;
}

const DefaultContainer: React.FC<Props> = props => {
  useInjectSaga({ key: "default", saga: saga });

  const handleClickUpdateSteAction = () => {
    props.changeFullname("Awesome Jan Dave Arce");
  };

  return (
    <div className="DefaultContainer">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate by Jan Dave Arce"
      >
        <meta name="description" content="A React.js Boilerplate Application" />
      </Helmet>

      <div>This is a default Container</div>
      <p>{props.default.fullname}</p>
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
  default: makeSelectDefaultContainer()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    changeFullname: (payload: string) => dispatch(changeFullname(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DefaultContainer);
