/*
 * ArenaConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

enum ActionTypes {
  CAST_PLAYER_SKILL = "boilerplate/Arena/CAST_PLAYER_SKILL",
  SET_PLAYER_ACTION = "boilerplate/Arena/SET_PLAYER_ACTION",

  CAST_DRAGON_SKILL = "boilerplate/Arena/CAST_DRAGON_SKILL",
  SET_DRAGON_ACTION = "boilerplate/Arena/SET_DRAGON_ACTION"
}

export default ActionTypes;
