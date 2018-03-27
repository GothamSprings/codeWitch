const config = require("../scripts/config.json");

// actions
const WITCH_RESET_LOCATION = 'WITCH_RESET_LOCATION';
const WITCH_MOVE_UP = 'WITCH_MOVE_UP';
const WITCH_MOVE_DOWN = 'WITCH_MOVE_DOWN';
const WITCH_MOVE_LEFT = 'WITCH_MOVE_LEFT';
const WITCH_MOVE_RIGHT = 'WITCH_MOVE_RIGHT';

const WITCH_PICK_UP_ITEM = 'WITCH_PICK_UP_ITEM';
const WITCH_CAST_SPELL = 'WITCH_CAST_SPELL';

const WITCH_SET_LEVEL = 'WITCH_SET_LEVEL';



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
    ogres: ["Shrek", "Fuiluthin", "Gothmog", "Melkor"],
    near_an_ogre: false,
    at_end_point: false,
    level: 1
  }, action) {

  switch(action.type) {
    case WITCH_RESET_LOCATION:
      // return Object.assign({}, state, { witchX: startX, witchY: startY });
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
      if(isNearMonster(state.witchX, state.witchY)) {
        alert(`Monster said "Ouch!" and fled.`);
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

// if the witch overlaps with an ogre, the witch is harmed
// if witch picks up an item or harms a monster, the item / monster disppears from the board

const checkAndUpdate = (nextPosition, state) => {
  // Configurations from global configuration file.
  let levelConfigs = config.levels[state.level]
  // ex. (levelConfigs.board; levelConfigs.startpoint)

  if(nextPosition.witchX < 0 || nextPosition.witchX >= 512 ||
     nextPosition.witchY < 0 || nextPosition.witchY >= 512) {
    throw new Error("Witch cannot escape out of bounds!");
  }
  // if(levelBoard[nextPosition.witchY/gridsize][nextPosition.witchX/gridsize] === 0) {
  //   throw new Error("Bonk! Witch hit the wall!");
  // }
  nextPosition.near_an_ogre = isNearMonster(nextPosition.witchX, nextPosition.witchY);
  nextPosition.at_end_point = isAtEndpoint(nextPosition.witchX, nextPosition.witchY);
  return Object.assign({}, state, nextPosition);
}

const isAtEndpoint = (witchX, witchY) => {
  // return witchX === endX && witchY === endY;
}

const isAtItem = (witchX, witchY) => {
  // return items_positions.some(item => {
  //   return item[0] * gridsize === witchY && item[1] * gridsize === witchX;
  // });
}

const isNearMonster = (witchX, witchY) => {
  // return monsters_positions.some(monster => {
  //   const dx = witchX/gridsize - monster[1];
  //   const dy = witchY/gridsize - monster[0];
  //   return dx * dx + dy * dy === 1;
  // })
}


const level = 1;
// const levelBoard = levels[level].board;
// const startX = levels[level].startpoint[1] * gridsize;
// const startY = levels[level].startpoint[0] * gridsize;
// const endX = levels[level].endpoint[1] * gridsize;
// const endY = levels[level].endpoint[0] * gridsize;
// const items_positions = levels[level].items.map(item => item.coord);
// const monsters_positions = levels[level].monsters.map(monster => monster.coord);
