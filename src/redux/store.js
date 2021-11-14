import { createStore, combineReducers } from 'redux'
import $totter from './totter.reducer'
const reducers = combineReducers({ $totter })
export default createStore(reducers)