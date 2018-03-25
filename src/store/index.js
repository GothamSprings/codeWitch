import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import editorValue from './editorValue'
import witchCoords from './witchCoords'
import settingBoard from './settingBoard'
import gameType from './gameType'
import userDetail from './userDetail'

const reducer = combineReducers({ editorValue, settingBoard, witchCoords, gameType, userDetail })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './editorValue'
export * from './witchCoords'
export * from './settingBoard'
export * from './gameType'
export * from './userDetail'
