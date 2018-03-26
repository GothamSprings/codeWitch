// import Chance from 'chance';

export const ActionTypes = {
  CREATE_GAME: 'CREATE_GAME'
};

const defaultGameState = {
   numRows: 0, numCols: 0, boardValues: []
};

export const createGame = (numRows, numCols, walls) => {
  const boardValues = [];
  // const chance = new Chance();
  for (let i = 0; i < numRows; i++) {
    boardValues[i] = [];
    for (let j = 0; j < numCols; j++) {
      boardValues[i][j] = 1;
    }
  }
  // const wallPositions = chance.unique(
  //   chance.integer,
  //   walls,
  //   { min: 0, max: (numRows * numCols) - 1 }
  // );
  // console.log(wallPositions, "i wnat to seee")

  // wallPositions.forEach((position) => {
  //   const row = parseInt(position / numCols, 10);
  //   const col = position % numCols
  //   boardValues[row][col] = 0;
  //   console.log("row", row, "col", col, '[row][col]', boardValues[row][col], wallPositions)
  // });
  
  boardValues[0][1] = 0
  boardValues[1][1] = 0
  boardValues[2][1] = 0
  boardValues[3][1] = 0
  boardValues[4][1] = 0
  boardValues[5][1] = 0
  boardValues[6][1] = 0
  boardValues[0][5] = 0
  boardValues[1][5] = 0
  boardValues[2][5] = 0
  boardValues[3][5] = 0
  boardValues[4][5] = 0
  boardValues[5][5] = 0
  boardValues[6][5] = 0
  boardValues[1][7] = 0
  boardValues[2][7] = 0
  boardValues[3][7] = 0
  boardValues[4][7] = 0
  boardValues[5][7] = 0
  boardValues[6][7] = 0
  boardValues[7][7] = 0

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
