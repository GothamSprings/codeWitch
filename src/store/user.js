

const SIGNED_IN = 'SIGNED_IN';

export function logUser(email) {
  return {
    type: SIGNED_IN,
    email
  }
}

const initialState = {
  email: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_IN: {
      return {
        email: action.email
      }
    }
    default:
      return state
  }
}