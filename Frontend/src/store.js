import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import {
	appReducer,
	dateRangeReducer,
	roomReducer,
	roomsReducer,
	userReducer,
	usersReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	room: roomReducer,
	rooms: roomsReducer,
	dateRange: dateRangeReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))