import { createStore } from 'redux'

import reducer from './reducers'
import middleware from '../middleware'

const initialState = {}

export default () => createStore(
    reducer,
    initialState,
    middleware // to add other middleware
  )

