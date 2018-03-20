const WITCH_X_RIGHT = 'WITCH_X_RIGHT'
const WITCH_Y_DOWN = 'WITCH_Y_DOWN'

const changeWitchX = (witchX) => ({ type: WITCH_X_RIGHT, witchX });
const changeWitchY = (witchY) => ({ type: WITCH_Y_DOWN, witchY })


export const dispatchChangeWitchX = (witchX) => (dispatch) => dispatch(changeWitchX(witchX));
export const dispatchChangeWitchY = (witchY) => (dispatch) => dispatch(changeWitchY(witchY));

export default function (state = {witchX: 0, witchY:0}, action) {
  switch(action.type) {
    case WITCH_X_RIGHT:
      return Object.assign({}, state, { witchX: state.witchX+action.witchX });
    case WITCH_Y_DOWN:
      return Object.assign({}, state, { witchY: state.witchY+action.witchY });
    default:
      return state;
  }
}
