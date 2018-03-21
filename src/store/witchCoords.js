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

const witchMoveUp = () => ({ type: WITCH_MOVE_UP, witchY: -20});
const witchMoveDown = () => ({ type: WITCH_MOVE_DOWN, witchY: 20});
const witchMoveLeft = () => ({ type: WITCH_MOVE_LEFT, witchX: -20});
const witchMoveRight = () => ({ type: WITCH_MOVE_RIGHT, witchX: 20});



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
      return Object.assign({}, state, { witchY: state.witchY + action.witchY });
    case WITCH_MOVE_DOWN:
      return Object.assign({}, state, { witchY: state.witchY + action.witchY });    
    case WITCH_MOVE_LEFT:
      return Object.assign({}, state, { witchX: state.witchX + action.witchX });
    case WITCH_MOVE_RIGHT:
      return Object.assign({}, state, { witchX: state.witchX + action.witchX });
    default:
      return state;
  }
}
