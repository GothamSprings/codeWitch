const config = require("../scripts/config.json")

// actions
const WITCH_RESET_LOCATION = 'WITCH_RESET_LOCATION';
const WITCH_SET_LEVEL = 'WITCH_SET_LEVEL';
const WITCH_MOVE_UP = 'WITCH_MOVE_UP';
const WITCH_MOVE_DOWN = 'WITCH_MOVE_DOWN';
const WITCH_MOVE_LEFT = 'WITCH_MOVE_LEFT';
const WITCH_MOVE_RIGHT = 'WITCH_MOVE_RIGHT';
const WITCH_PICK_UP_ITEM = 'WITCH_PICK_UP_ITEM';
const WITCH_CAST_SPELL = 'WITCH_CAST_SPELL';

const gridsize = 64;
// action creators
const witchResetLocation = () => ({ type: WITCH_RESET_LOCATION });

const witchMoveUp = () => ({ type: WITCH_MOVE_UP, witchY: -gridsize });
const witchMoveDown = () => ({ type: WITCH_MOVE_DOWN, witchY: gridsize });
const witchMoveLeft = () => ({ type: WITCH_MOVE_LEFT, witchX: -gridsize });
const witchMoveRight = () => ({ type: WITCH_MOVE_RIGHT, witchX: gridsize });

const witchPickUpItem = (item) => ({ type: WITCH_PICK_UP_ITEM, item });
const witchCastSpell = (ogre) => ({ type: WITCH_CAST_SPELL, ogre });

const witchSetLevel = (level) => ({ type: WITCH_SET_LEVEL, level });

// thunk creators

export const dispatchWitchReset = () => (dispatch) => dispatch(witchResetLocation());

export const dispatchWitchMoveUp = () => (dispatch) => dispatch(witchMoveUp());
export const dispatchWitchMoveDown = () => (dispatch) => dispatch(witchMoveDown());
export const dispatchWitchMoveLeft = () => (dispatch) => dispatch(witchMoveLeft());
export const dispatchWitchMoveRight = () => (dispatch) => dispatch(witchMoveRight());

export const dispatchWitchPickUpItem = (item) => (dispatch) => dispatch(witchPickUpItem(item));
export const dispatchWitchCastSpell = (ogre) => (dispatch) => dispatch(witchCastSpell(ogre));

export const dispatchWitchLevel = (level) => (dispatch) => dispatch(witchSetLevel(level));

// reducer
export default function (state = {
    witchX: 0,
    witchY:0,
    witchBag: [],
    ogres: ["Shrek", "Fuiluthin", "Gothmog", "Melkor"], near_an_ogre: false,
    at_end_point: false,
    level: 1
  }, action) {

  switch(action.type) {
    case WITCH_RESET_LOCATION:
      return Object.assign({}, state, { witchX: 0, witchY: 0 });


    case WITCH_MOVE_UP:
      return checkAndUpdate({ witchX: state.witchX, witchY: state.witchY + action.witchY }, state);
    case WITCH_MOVE_DOWN:
      return checkAndUpdate({ witchX: state.witchX, witchY: state.witchY + action.witchY }, state);
    case WITCH_MOVE_LEFT:
      return checkAndUpdate({ witchX: state.witchX + action.witchX, witchY: state.witchY }, state);
    case WITCH_MOVE_RIGHT:
      return checkAndUpdate({ witchX: state.witchX + action.witchX, witchY: state.witchY }, state);

    case WITCH_PICK_UP_ITEM:
      if(isAtItem(state.witchX, state.witchY)) {
        alert("The witch picked up a " + action.item + '.');
        return Object.assign({}, state, { witchBag: [action.item, ...state.witchBag] });
      } else {
        alert("Oops, wrong spot!");
        return state;
      }
    case WITCH_CAST_SPELL: // if near an ogre, the witch can kill it
      if(isNearOgre(state.witchX, state.witchY)) {
        alert(`Ogre said "Ouch!"`);
        return Object.assign({}, state, { ogres: state.ogres.filter(ogre => ogre !== action.ogre) });
      } else {
        alert("Cast ineffective. Please try it another time.");
        return state;
      }
    case WITCH_SET_LEVEL:
      return Object.assign({}, state, { level: action.level });

    default:
      return state;
  }
}
// if the witch overlaps with an ogre, the witch is dead?

const checkAndUpdate = (nextPosition, state) => {
  // Configurations from global configuration file.
  let levelConfigs = config.levels[state.level]
  // ex. (levelConfigs.board; levelConfigs.startpoint)

  if(nextPosition.witchX < 0 || nextPosition.witchX >= 512 ||
     nextPosition.witchY < 0 || nextPosition.witchY >= 512) {
    throw new Error("Out of bounds!");
  }
  if(level2Board[nextPosition.witchY/gridsize][nextPosition.witchX/gridsize] === 0) {
    throw new Error("Bonk! Hit the wall!");
  }
  nextPosition.near_an_ogre = isNearOgre(nextPosition.witchX, nextPosition.witchY);
  nextPosition.at_end_point = isAtEndpoint(nextPosition.witchX, nextPosition.witchY);
  return Object.assign({}, state, nextPosition);
}

const isAtEndpoint = (witchX, witchY) => {
  return witchX === endX && witchY === endY;
}

const isAtItem = (witchX, witchY) => {
  return level2Item[witchY/gridsize][witchX/gridsize] === 1;
}

const isNearOgre = (witchX, witchY) => {
  return (witchY + gridsize < 512 && level2Ogre[witchY/gridsize + 1][witchX/gridsize] === 1) ||
    (witchY - gridsize >= 0 && level2Ogre[witchY/gridsize - 1][witchX/gridsize] === 1) ||
    (witchX + gridsize < 512 && level2Ogre[witchY/gridsize][witchX/gridsize + 1] === 1) ||
    (witchX - gridsize >= 0 && level2Ogre[witchY/gridsize][witchX/gridsize - 1] === 1);
}


const level2Board = [
  [1, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1]
]

const endX = 448, endY = 448;

const level2Item = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1]
]

const level2Ogre = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
