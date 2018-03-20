export const ActionTypes = {
  CREATE_GAME: 'CREATE_GAME'
};

const defaultGameState = {
   numRows: 0, numCols: 0, boardValues: []
};

export const createGame = (numRows, numCols) => {
  const boardValues = [];

  for (let i = 0; i < numRows; i++) {
    boardValues[i] = [];
    for (let j = 0; j < numCols; j++) {
      boardValues[i][j] = 0;
    }
  }
  return {
    type: ActionTypes.CREATE_GAME,
    numRows,
    numCols,
    boardValues,
  };
};

export default function (state = defaultGameState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_GAME:
      return Object.assign({}, state, {
        numRows: action.numRows,
        numCols: action.numCols,
        boardValues: action.boardValues,
      });
    default:
      return state;
  }
}