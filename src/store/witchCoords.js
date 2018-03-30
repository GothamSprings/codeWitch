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
const GET_LEVEL = 'GET_LEVEL';

const WITCH_RESET_MESSAGE = 'WITCH_RESET_MESSAGE'


const gridsize = 64;
// action creators
const witchResetLocation = () => ({ type: WITCH_RESET_LOCATION });
const witchMoveUp = () => ({ type: WITCH_MOVE_UP, witchY: -gridsize });
const witchMoveDown = () => ({ type: WITCH_MOVE_DOWN, witchY: gridsize });
const witchMoveLeft = () => ({ type: WITCH_MOVE_LEFT, witchX: -gridsize });
const witchMoveRight = () => ({ type: WITCH_MOVE_RIGHT, witchX: gridsize });

const witchPickUpItem = () => ({ type: WITCH_PICK_UP_ITEM });
const witchCastSpell = (monster) => ({ type: WITCH_CAST_SPELL, monster });

const witchSetLevel = (level) => ({ type: WITCH_SET_LEVEL, level });
const getLevel = (level) => ({type: GET_LEVEL, mapData: config.levels[level] })

const witchResetMessage = () => ({
  type: WITCH_RESET_MESSAGE
})



// thunk creators
export const dispatchWitchReset = () => (dispatch) => dispatch(witchResetLocation());
export const dispatchWitchMoveUp = () => (dispatch) => dispatch(witchMoveUp());
export const dispatchWitchMoveDown = () => (dispatch) => dispatch(witchMoveDown());
export const dispatchWitchMoveLeft = () => (dispatch) => dispatch(witchMoveLeft());
export const dispatchWitchMoveRight = () => (dispatch) => dispatch(witchMoveRight());

export const dispatchWitchPickUpItem = () => (dispatch) => dispatch(witchPickUpItem());
export const dispatchWitchCastSpell = () => (dispatch) => dispatch(witchCastSpell());

export const dispatchWitchLevel = (level) => (dispatch) => {
  dispatch(witchSetLevel(level));
  dispatch(getLevel(level));
}

export const dispatchWitchResetMessage = () => (dispatch) => dispatch(witchResetMessage());

// reducer
export default function (state = {
    mapData: {},
    witchX: 0,
    witchY: 0,
    endX: 448,
    endY: 448,
    witchBag: [],
    itemName: '',
    itemX: 0,
    itemY: 0,
    monsterName: '',
    monsterX: 384,
    monsterY: 384,
    monsters: [],
    at_a_monster: false,
    near_a_monster: false,
    at_end_point: false,
    level: 1,
    statusMessage: ''
  }, action) {

  switch(action.type) {
    case WITCH_RESET_LOCATION:
      return Object.assign({}, state, {
        witchX: state.mapData.startpoint[1] * gridsize,
        witchY: state.mapData.startpoint[0] * gridsize,
        at_end_point: false,
        witchBag: [],
        itemX: config.levels[state.level].items[0].coord[1] * gridsize,
        monsterX: config.levels[state.level].monsters[0].coord[1] * gridsize,
        statusMessage: '' 
      });
    case WITCH_MOVE_UP:
      return checkAndUpdate({ witchX: state.witchX, witchY: state.witchY + action.witchY }, state);
    case WITCH_MOVE_DOWN:
      return checkAndUpdate({ witchX: state.witchX, witchY: state.witchY + action.witchY }, state);
    case WITCH_MOVE_LEFT:
      return checkAndUpdate({ witchX: state.witchX + action.witchX, witchY: state.witchY }, state);
    case WITCH_MOVE_RIGHT:
      return checkAndUpdate({ witchX: state.witchX + action.witchX, witchY: state.witchY }, state);

    case WITCH_PICK_UP_ITEM:
      if(isAtItem(state.witchX, state.witchY, state.itemX, state.itemY)) {
        let message = "The witch picked up a " + state.itemName + ' and learned a spell!'
        //alert(message);
        return Object.assign({}, state, { witchBag: [state.itemName, ...state.witchBag], itemX: 600,  statusMessage: message });
      } else {
        let message = "There's nothing here!"
        //alert(message);
        return Object.assign({}, state, { statusMessage: message });
      }
    case WITCH_CAST_SPELL:
      if(isNearMonster(state.witchX, state.witchY, state.monsterX, state.monsterY)) {
        if(state.witchBag.length) {
          let message = `The ${state.monsterName} said "Ouch!", and fled.`
          //alert(message);
          return Object.assign({}, state, { monsterX: 600, witchBag: [], statusMessage: message });
        } else {
          let message = `Pick up the ${state.itemName} first to be able to cast the spell!`
          throw new Error(message);
        }
      } else {
        let message = "You cast your spell and nothing happened."
        //alert(message);
        return Object.assign({}, state, { statusMessage: message });
      }

    case WITCH_SET_LEVEL:
      return Object.assign({}, state, { level: action.level, witchBag: [] });

    case GET_LEVEL:
      return Object.assign({}, state, {
        mapData: action.mapData,
        board: action.mapData.board,
        witchX: action.mapData.startpoint[1] * gridsize,
        witchY: action.mapData.startpoint[0] * gridsize,
        endX: action.mapData.endpoint[1] * gridsize,
        endY: action.mapData.endpoint[0] * gridsize,
        itemName: action.mapData.items[0].type,
        itemX: action.mapData.items[0].coord[1] * gridsize,
        itemY: action.mapData.items[0].coord[0] * gridsize,
        monsterName: action.mapData.monsters[0].type,
        monsterX: action.mapData.monsters[0].coord[1] * gridsize,
        monsterY: action.mapData.monsters[0].coord[0] * gridsize
      });

    case WITCH_RESET_MESSAGE:
      return Object.assign({}, state, {
        statusMessage: ''
      })
    default:
      return state;
  }
}



const checkAndUpdate = (nextPosition, state) => {

  if(nextPosition.witchX < 0 || nextPosition.witchX >= 512 ||
     nextPosition.witchY < 0 || nextPosition.witchY >= 512) {
    throw new Error("A dark fog is preventing the witch from leaving the bounds!");
  }
  if(state.board[nextPosition.witchY/gridsize][nextPosition.witchX/gridsize] === 0) {
    throw new Error("Oh, no! The witch can't go there!");
  }
  if(isAtMonster(nextPosition.witchX, nextPosition.witchY, state.monsterX, state.monsterY)) {
    throw new Error(`Bonk! The witch bumped into a ${state.monsterName}!`);
  }

  nextPosition.near_a_monster = isNearMonster(nextPosition.witchX, nextPosition.witchY, state.monsterX, state.monsterY);
  nextPosition.at_end_point = isAtEndpoint(nextPosition.witchX, nextPosition.witchY, state.endX, state.endY);
  return Object.assign({}, state, nextPosition);
}

const isAtEndpoint = (witchX, witchY, endX, endY) => {
  return witchX === endX && witchY === endY;
}

const isAtItem = (witchX, witchY, itemX, itemY) => {
  return witchX === itemX && witchY === itemY;
}

const isAtMonster = (witchX, witchY, monsterX, monsterY) => {
  return witchX === monsterX && witchY === monsterY;
}

const isNearMonster = (witchX, witchY, monsterX, monsterY) => {
  const dx = (witchX - monsterX) / gridsize;
  const dy = (witchY - monsterY) / gridsize;
  return dx * dx + dy * dy === 1;
}
