import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import Reducer from '../reducers/Reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const logger = createLogger()
const middleware = [ReduxThunk, logger]

export const initialState = {
  token: null,
  userId: null,
}

const store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
