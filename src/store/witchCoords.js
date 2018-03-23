const WITCH_MOVE_X = 'WITCH_MOVE_X';
const WITCH_MOVE_Y = 'WITCH_MOVE_Y';
const WITCH_RESET_LOCATION = 'WITCH_RESET_LOCATION';

const WITCH_MOVE_UP = 'WITCH_MOVE_UP';
const WITCH_MOVE_DOWN = 'WITCH_MOVE_DOWN';
const WITCH_MOVE_LEFT = 'WITCH_MOVE_LEFT';
const WITCH_MOVE_RIGHT = 'WITCH_MOVE_RIGHT';



const changeWitchX = (witchX) => ({ type: WITCH_MOVE_X, witchX });
const changeWitchY = (witchY) => ({ type: WITCH_MOVE_Y, witchY });
const witchResetLocation = () => ({ type: WITCH_RESET_LOCATION });

const gridsize = 64;

const witchMoveUp = () => ({ type: WITCH_MOVE_UP, witchY: -gridsize});
const witchMoveDown = () => ({ type: WITCH_MOVE_DOWN, witchY: gridsize});
const witchMoveLeft = () => ({ type: WITCH_MOVE_LEFT, witchX: -gridsize});
const witchMoveRight = () => ({ type: WITCH_MOVE_RIGHT, witchX: gridsize});



export const dispatchChangeWitchX = (witchX) => (dispatch) => dispatch(changeWitchX(witchX));
export const dispatchChangeWitchY = (witchY) => (dispatch) => dispatch(changeWitchY(witchY));
export const dispatchWitchReset = () => (dispatch) => dispatch(witchResetLocation());

export const dispatchWitchMoveUp = () => (dispatch) => dispatch(witchMoveUp());
export const dispatchWitchMoveDown = () => (dispatch) => dispatch(witchMoveDown());
export const dispatchWitchMoveLeft = () => (dispatch) => dispatch(witchMoveLeft());
export const dispatchWitchMoveRight = () => (dispatch) => dispatch(witchMoveRight());


export default function (state = {witchX: 0, witchY:0}, action) {
  switch(action.type) {
    case WITCH_MOVE_X:
      return Object.assign({}, state, { witchX: state.witchX + action.witchX });
    case WITCH_MOVE_Y:
      return Object.assign({}, state, { witchY: state.witchY + action.witchY });
    case WITCH_RESET_LOCATION:
      return Object.assign({}, state, { witchX: 0, witchY: 0 });

    case WITCH_MOVE_UP:
      if(isValidMove(state.witchX, state.witchY + action.witchY)) {
        return Object.assign({}, state, { witchY: state.witchY + action.witchY });
      } else {
        throw new Error("Bonk! Hit the wall!");
      }
    case WITCH_MOVE_DOWN:
      if(isValidMove(state.witchX, state.witchY + action.witchY)) {
        return Object.assign({}, state, { witchY: state.witchY + action.witchY });
      } else {
        throw new Error("Bonk! Hit the wall!");
      }
    case WITCH_MOVE_LEFT:
      if(isValidMove(state.witchX + action.witchX, state.witchY)) {
        return Object.assign({}, state, { witchX: state.witchX + action.witchX });
      } else {
        throw new Error("Bonk! Hit the wall!");
      }
    case WITCH_MOVE_RIGHT:
      if(isValidMove(state.witchX + action.witchX, state.witchY)) {
        return Object.assign({}, state, { witchX: state.witchX + action.witchX });
      } else {
        throw new Error("Bonk! Hit the wall!");
      }
    default:
      return state;
  }
}


const isValidMove = (nextX, nextY) => {
  return nextX >= 0 && nextX < 512 && nextY >= 0 && nextY < 512 && level2Board[nextY/gridsize][nextX/gridsize] === 1;
}


const level2Board = [
  [1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1]
]
