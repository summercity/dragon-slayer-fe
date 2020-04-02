import React from "react";

import HP from "@material-ui/core/Badge";
import { PlayerIterface, DragonIterface } from "../../containers/Arena/types";

import knight from "./img/knight.gif";
import knightAttack from "./img/knight-attack.gif";
import knightHeal from "./img/knight-heal.gif";
import dragon from "./img/dragon.gif";

interface Props {
  vertical: "bottom" | "top";
  horizontal: "left" | "right";
  hero: string;
  player: PlayerIterface | DragonIterface;
}

const Hero: React.FC<Props> = props => {
  const { player } = props;
  return (
    <React.Fragment>
      {player.hp && player.hp >= 0 && props.hero === "knight" ? (
        <HP
          badgeContent={props.player.hp}
          color="primary"
          anchorOrigin={{
            vertical: props.vertical,
            horizontal: props.horizontal
          }}
        >
          {player.skill === "stop" ? (
            <img src={knight} alt="Knight" className="hero" />
          ) : (
            ""
          )}

          {player.skill === "attack" ? (
            <img src={knightAttack} alt="Knight" className="hero" />
          ) : (
            ""
          )}
          {player.skill === "heal" ? (
            <img src={knightHeal} alt="Knight" className="hero180" />
          ) : (
            ""
          )}
        </HP>
      ) : (
        ""
      )}
      {props.player.hp && props.player.hp >= 0 && props.hero === "dragon" ? (
        <HP
          badgeContent={props.player.hp}
          color="error"
          anchorOrigin={{
            vertical: props.vertical,
            horizontal: props.horizontal
          }}
        >
          <img src={dragon} alt="Dragon" className="dragon" />
        </HP>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Hero;
