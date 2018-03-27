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



// thunk creators
export const dispatchWitchReset = () => (dispatch) => dispatch(witchResetLocation());
export const dispatchWitchMoveUp = () => (dispatch) => dispatch(witchMoveUp());
export const dispatchWitchMoveDown = () => (dispatch) => dispatch(witchMoveDown());
export const dispatchWitchMoveLeft = () => (dispatch) => dispatch(witchMoveLeft());
export const dispatchWitchMoveRight = () => (dispatch) => dispatch(witchMoveRight());

export const dispatchWitchPickUpItem = () => (dispatch) => dispatch(witchPickUpItem());
export const dispatchWitchCastSpell = (monster) => (dispatch) => dispatch(witchCastSpell(monster));

export const dispatchWitchLevel = (level) => (dispatch) => {
  console.log('LEVEL!!!!!' + level);
  dispatch(witchSetLevel(level));
  dispatch(getLevel(level));
}


// reducer
export default function (state = {
    mapData: {},
    witchX: 0,
    witchY: 0,
    endX: 448,
    endY: 448,
    witchBag: [],
    items: [],
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
    level: 1
  }, action) {


  switch(action.type) {
    case WITCH_RESET_LOCATION:
      return Object.assign({}, state, { witchX: state.mapData.startpoint[1] * gridsize, witchY: state.mapData.startpoint[0] * gridsize });
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
        alert("The witch picked up a " + state.itemName + '.');
        return Object.assign({}, state, { witchBag: [state.itemName, ...state.witchBag], itemX: 600 });
      } else {
        alert("Oops, wrong spot!");
        return state;
      }
    case WITCH_CAST_SPELL: // if near a monster, the witch can kill it
      if(isNearMonster(state.witchX, state.witchY, state.monsterX, state.monsterY)) {
        alert(`A ${state.monsterName} said, "Ouch!", and fled.`);
        return Object.assign({}, state, { monsterX: 600 });
      } else {
        alert("Cast ineffective. Please try it another time.");
        return state;
      }

    case WITCH_SET_LEVEL:
      return Object.assign({}, state, { level: action.level });

    case GET_LEVEL:
      console.log('ACTION MAPDATA');
      console.log(action.mapData);
      return Object.assign({}, state, {
        mapData: action.mapData,
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

    default:
      return state;
  }
}



const checkAndUpdate = (nextPosition, state) => {
  const allOnThisLevel = config.levels[state.level];
  const levelBoard = allOnThisLevel.board;
  // const monsters_positions = allOnThisLevel.monsters.map(monster => monster.coord);
  const monster_info = allOnThisLevel.monsters[0];
  const monsterX = monster_info.coord[1] * gridsize;
  const monsterY = monster_info.coord[0] * gridsize;
  const endX = allOnThisLevel.endpoint[1] * gridsize;
  const endY = allOnThisLevel.endpoint[0] * gridsize;

  if(nextPosition.witchX < 0 || nextPosition.witchX >= 512 ||
     nextPosition.witchY < 0 || nextPosition.witchY >= 512) {
    throw new Error("Witch cannot escape out of bounds!");
  }
  if(levelBoard[nextPosition.witchY/gridsize][nextPosition.witchX/gridsize] === 0) {
    throw new Error("Bonk! Witch hit the wall!");
  }
  if(isAtMonster(nextPosition.witchX, nextPosition.witchY, monsterX, monsterY)) {
    throw new Error("Bonk! Witch bumped into a monster!");
  }

  nextPosition.near_a_monster = isNearMonster(nextPosition.witchX, nextPosition.witchY, monsterX, monsterY);
  nextPosition.at_end_point = isAtEndpoint(nextPosition.witchX, nextPosition.witchY, endX, endY);
  return Object.assign({}, state, nextPosition);
}

const isAtEndpoint = (witchX, witchY, endX, endY) => {
  return witchX === endX && witchY === endY;
}

const isAtItem = (witchX, witchY, itemX, itemY) => {
  // return items_positions.some(item => {
  //   return item[0] * gridsize === witchY && item[1] * gridsize === witchX;
  // });
  return witchX === itemX && witchY === itemY;
}

const isAtMonster = (witchX, witchY, monsterX, monsterY) => {
  // return monsters_positions.some(monster => {
  //   return monster[0] * gridsize === witchY && monster[1] * gridsize === witchX;
  // })
  return witchX === monsterX && witchY === monsterY;
}


const isNearMonster = (witchX, witchY, monsterX, monsterY) => {
  // return monsters_positions.some(monster => {
  //   const dx = witchX/gridsize - monster[1];
  //   const dy = witchY/gridsize - monster[0];
  //   return dx * dx + dy * dy === 1;
  // })
  const dx = (witchX - monsterX) / gridsize;
  const dy = (witchY - monsterY) / gridsize;
  return dx * dx + dy * dy === 1;
}

// const items_positions = allOnThisLevel.items.map(item => item.coord); // for more than 1 item
// const monsters_positions = allOnThisLevel.monsters.map(monster => monster.coord); // for more than 1 monster

