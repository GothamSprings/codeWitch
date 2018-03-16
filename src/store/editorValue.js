//const SET_TEXT_VALUE = 'SET_TEXT_VALUE';
const CHANGE_TEXT_VALUE = 'CHANGE_TEXT_VALUE';

const changeTextValue = (textValue) => ({
  type: CHANGE_TEXT_VALUE,
  textValue
});

export const dispatchTextChange = (textValue) => (dispatch) =>
  dispatch(changeTextValue(textValue));

export default function (state = '', action) {
  switch (action.type) {
    case CHANGE_TEXT_VALUE:
      return action.textValue;
    default:
      return state;
  }
}
