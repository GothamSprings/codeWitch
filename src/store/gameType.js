const SET_GAME_TYPE = 'SET_GAME_TYPE';

const setGameType = (gameType) => ({
  type: SET_GAME_TYPE,
  gameType
});

export const dispatchGameType = (gameType) => (dispatch) =>
  dispatch(setGameType(gameType));

  export default function (state = '', action) {
    switch (action.type) {
      case SET_GAME_TYPE:
        return action.gameType;
      default:
        return state;
    }
  }
