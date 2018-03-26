const SET_USER_LEVEL = 'SET_USER_LEVEL';

const setUserLevel = (userLevel) => ({
  type: SET_USER_LEVEL,
  userLevel
});

export const dispatchUserLevel = (userLevel) => (dispatch) =>
  dispatch(setUserLevel(userLevel));

  export default function (state = 1, action) {
    switch (action.type) {
      case SET_USER_LEVEL:
        return action.userLevel;
      default:
        return state;
    }
  }
