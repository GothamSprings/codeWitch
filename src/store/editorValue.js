const CHANGE_TEXT_VALUE = 'CHANGE_TEXT_VALUE';
const CLEAR_TEXT_VALUE = 'CLEAR_TEXT_VALUE';

const changeTextValue = (textValue) => ({
  type: CHANGE_TEXT_VALUE,
  textValue
});

const clearTextValue = () => ({
  type: CLEAR_TEXT_VALUE
})

export const dispatchTextChange = (textValue) => (dispatch) =>
  dispatch(changeTextValue(textValue));

export const dispatchTextClearValue = () => (dispatch) =>
  dispatch(clearTextValue())

export default function (state = '', action) {
  switch (action.type) {
    case CHANGE_TEXT_VALUE:
      return action.textValue;
    case CLEAR_TEXT_VALUE:
      return '';
    default:
      return state;
  }
}
