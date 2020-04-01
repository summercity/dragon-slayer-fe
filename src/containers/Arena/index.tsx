import React, { memo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, Dispatch } from "redux";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// import messages from "./messages";

import Hero from "../../components/Hero";

import saga from "./saga";
import { castSkillPlayerAction, castSkillDragonAction } from "./actions";
import makeSelectArena from "./selectors";
import { PlayerIterface, DragonIterface } from "./types";

import { useInjectSaga } from "../../utils/injectSaga";
import {
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes
} from "./types";
import { ApplicationRootState } from "../../types";
import "./Arena.css";
interface DesiredSelection {}

interface Props extends ContainerActions {
  arena: ContainerState;
}

const Arena: React.FC<Props> = props => {
  useInjectSaga({ key: "arena", saga: saga });
  const { castSkillDragon } = props;
  const { player, dragon } = props.arena;

  const handleClickAttack = () => {
    const damage = Math.floor(Math.random() * 10) + 1;
    const payload = {
      ...player,
      casting: true,
      skill: "attack", // attack, blast, heal, give, up
      damage
    };
    props.castSkillPlayer(payload);
  };

  const handleClickHeal = () => {
    const heal = Math.floor(Math.random() * 10);
    const payload = {
      ...player,
      casting: true,
      skill: "heal", // attack, blast, heal, give, up
      hp: player.hp && player.hp + heal,
      damage: 0
    };
    props.castSkillPlayer(payload);
  };

  useEffect(() => {
    setInterval(function() {
      const damage = Math.floor(Math.random() * 10) + 1;
      const payload = {
        ...dragon,
        casting: true,
        skill: "attack", // attack, blast, heal, give, up
        damage
      };

      castSkillDragon(payload);
    }, 5000);
  }, [dragon, castSkillDragon]);

  return (
    <div className="Arena">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate by Jan Dave Arce"
      >
        <meta name="description" content="A React.js Boilerplate Application" />
      </Helmet>
      {dragon.hp && dragon.hp <= 0 ? <h2>Yheeey! You win!</h2> : ""}
      {player.hp && player.hp <= 0 ? <h2>Game Over!!!</h2> : ""}
      <div>
        <Hero
          vertical="bottom"
          horizontal="left"
          hero="knight"
          player={player}
        />
        <Hero vertical="top" horizontal="right" hero="dragon" player={dragon} />
      </div>
      {player.hp && dragon.hp && (dragon.hp <= 0 || player.hp <= 0) ? (
        ""
      ) : (
        <div>
          <Button
            className="skill"
            variant="contained"
            onClick={handleClickAttack}
          >
            {player.casting && <CircularProgress />}
            Attack
          </Button>
          <Button
            className="skill"
            variant="contained"
            onClick={handleClickHeal}
          >
            {player.casting && <CircularProgress />}
            Heal
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  ApplicationRootState,
  DesiredSelection
>({
  arena: makeSelectArena()
});

function mapDispatchToProps(dispatch: Dispatch<ContainerActionsAndTypes>) {
  return {
    dispatch,
    castSkillPlayer: (payload: Partial<PlayerIterface>) =>
      dispatch(castSkillPlayerAction(payload)),
    castSkillDragon: (payload: Partial<DragonIterface>) =>
      dispatch(castSkillDragonAction(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Arena);
