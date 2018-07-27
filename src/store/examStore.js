import { createStore } from 'redux'
import onUserChange from '../reducers/examReducers'

let store = createStore(onUserChange)

export default store
