import Chance from 'chance';

export const ActionTypes = {
  CREATE_GAME: 'CREATE_GAME'
};

const defaultGameState = {
   numRows: 0, numCols: 0, boardValues: []
};

export const createGame = (numRows, numCols, walls) => {
  const boardValues = [];
  const chance = new Chance();
  for (let i = 0; i < numRows; i++) {
    boardValues[i] = [];
    for (let j = 0; j < numCols; j++) {
      boardValues[i][j] = 1;
    }
  }
  const wallPositions = chance.unique(
    chance.integer,
    walls,
    { min: 0, max: (numRows * numCols) - 1 }
  );
  console.log(wallPositions, "i wnat to seee")

  wallPositions.forEach((position) => {
    const row = parseInt(position / numCols, 10);
    const col = position % numCols
    boardValues[row][col] = 0;
    //console.log("row", row, "col", col, "8888888", boardValues[row][col], '[row][col]', wallPositions)
  });


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
        walls: action.walls,
      });
    default:
      return state;
  }
}