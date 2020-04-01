import React, { memo } from "react";

import HP from "@material-ui/core/Badge";
import { PlayerIterface, DragonIterface } from "../../containers/Arena/types";

import knight from "./img/knight.gif";
import knightAttack from "./img/knight-attack.gif";
import dragon from "./img/dragon.gif";

interface Props {
  vertical: "bottom" | "top";
  horizontal: "left" | "right";
  hero: string;
  player: PlayerIterface | DragonIterface;
}

const Hero: React.FC<Props> = props => {
  return (
    <React.Fragment>
      {props.player.hp && props.player.hp >= 0 && props.hero === "knight" ? (
        <HP
          badgeContent={props.player.hp}
          color="primary"
          anchorOrigin={{
            vertical: props.vertical,
            horizontal: props.horizontal
          }}
        >
          {props.player.skill === "stop" || props.player.skill === "heal" ? (
            <img src={knight} alt="Dragon" className="hero" />
          ) : (
            ""
          )}
          {props.player.skill === "attack" ? (
            <img src={knightAttack} alt="Dragon" className="hero" />
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

export default memo(Hero);
