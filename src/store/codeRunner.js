import axios from 'axios'

/* Action Creators */
const INTERP_CODE = 'INTERP_CODE'

/* Thunks */
const interpretCode = (code) => ({
  type: INTERP_CODE,
  code
})

const runnerUrl = "http://localhost:8080/api/coderunner"

// code should be a string, state should be an array however
export const dispatchInterpretCode = (code) => (dispatch) => {
  return axios.post(runnerUrl, {code})
    .then(res => res.data)
    .then(data => {
      if(data.result.includes("Error")){
        //console.log(data.result)

        return dispatch(interpretCode(data.result))
      } else {
        //console.log(data.console)
        return dispatch(interpretCode(data.console))
      }
    })
}

/* Reducer */

export default function (state = '', action) {
  switch (action.type) {
    case INTERP_CODE:
      return action.code;
    default:
      return state;
  }
}
