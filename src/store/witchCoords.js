const WITCH_MOVE_X = 'WITCH_MOVE_X';
const WITCH_MOVE_Y = 'WITCH_MOVE_Y';
const WITCH_RESET_LOCATION = 'WITCH_RESET_LOCATION';

const WITCH_MOVE_RIGHT = 'WITCH_MOVE_RIGHT';


const changeWitchX = (witchX) => ({ type: WITCH_MOVE_X, witchX });
const changeWitchY = (witchY) => ({ type: WITCH_MOVE_Y, witchY });
const witchResetLocation = () => ({ type: WITCH_RESET_LOCATION });

const witchMoveRight = () => ({ type: WITCH_MOVE_RIGHT, witchX: 20});


export const dispatchChangeWitchX = (witchX) => (dispatch) => dispatch(changeWitchX(witchX));
export const dispatchChangeWitchY = (witchY) => (dispatch) => dispatch(changeWitchY(witchY));
export const dispatchWitchReset = () => (dispatch) => dispatch(witchResetLocation());

export const dispatchWitchMoveRight = () => (dispatch) => dispatch(witchMoveRight());


export default function (state = {witchX: 0, witchY:0}, action) {
  switch(action.type) {
    case WITCH_MOVE_X:
      return Object.assign({}, state, { witchX: state.witchX + action.witchX });
    case WITCH_MOVE_Y:
      return Object.assign({}, state, { witchY: state.witchY + action.witchY });
    case WITCH_RESET_LOCATION:
      return Object.assign({}, state, { witchX: 0, witchY: 0 });
    case WITCH_MOVE_RIGHT:
      return Object.assign({}, state, { witchX: state.witchX + action.witchX });
    default:
      return state;
  }
}
