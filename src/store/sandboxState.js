const CHANGE_WITCH_X = 'CHANGE_WITCH_X'
const CHANGE_WITCH_Y = 'CHANGE_WITCH_Y'

const changeWitchX = (witchX) => ({
  type: CHANGE_WITCH_X, witchX
});

const changeWitchY = (witchY) => ({
  type: CHANGE_WITCH_Y, witchY
})

export const dispatchChangeWitchX = (witchX) => (dispatch) => dispatch(changeWitchX(witchX));

export const dispatchChangeWitchY = (witchY) => (dispatch) => dispatch(changeWitchY(witchY));

export default function (state = 0, action) {
  switch(action.type) {
    case CHANGE_WITCH_X:
      return action.witchX;
    case CHANGE_WITCH_Y:
      return action.witchY;
    default:
      return state;
  }
}
