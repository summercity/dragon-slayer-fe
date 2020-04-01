import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */

interface Player {
  readonly skill: string | undefined;
  readonly hp: number | undefined;
  readonly casting: boolean;
  readonly damage: number | undefined;
}

interface Dragon {
  readonly skill: string | undefined;
  readonly hp: number | undefined;
  readonly casting: boolean;
  readonly damage: number | undefined;
}

interface DefaultState {
  player: Player;
  dragon: Dragon;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = DefaultState;
type PlayerIterface = Player;
type DragonIterface = Dragon;
type ContainerActionsAndTypes = AppActions;

interface ContainerActions {
  castSkillPlayer: (payload: Partial<Player>) => void;
  castSkillDragon: (payload: Partial<Dragon>) => void;
}

export {
  RootState,
  ContainerState,
  ContainerActions,
  ContainerActionsAndTypes,
  PlayerIterface,
  DragonIterface
};
