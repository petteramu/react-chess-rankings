import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import ui from './ui/reducers'
import tournament from './tournaments/reducers'
import {
	REQUEST_PLAYERS,
	REQUEST_MATCHES,
	RECEIVE_MATCHES,
	RECEIVE_PLAYERS,
	STORE_JWT
} from './actions'
import jwt from "jsonwebtoken"

const initialMatchState = {
	matches: [],
	isFetching: false,
	pageNumber: 0,
}
function matches(state = initialMatchState, action) {
	switch (action.type) {
		case RECEIVE_MATCHES:
			let obj = Object.assign({}, state, {
				matches: action.payload,
				isFetching: false,
				pageNumber: 0
			})
			return obj

		case REQUEST_MATCHES:
			return Object.assign({}, state, { isFetching: true })

		default:
			return state
	}
}

const initialPlayerState = {
	players: [],
	isFetching: false
}
function players(state = initialPlayerState, action) {
	switch(action.type) {
		case RECEIVE_PLAYERS:
			return Object.assign({}, state, {
				players: action.payload,
				isFetching: false,
			})

		case REQUEST_PLAYERS:
			return Object.assign({}, state, { isFetching: true })

		default:
			return state
	}
}

const initialAuthState = {
	token: null,
	permissions: null
}
function auth(state = initialAuthState, action) {
	switch(action.type) {
		case STORE_JWT:
			return Object.assign({}, state, {
				token: action.payload,
				permissions: jwt.decode(action.payload).permissions
			})
		default:
			return state;
	}
}

const createReducers = (history) => combineReducers({
	router: connectRouter(history),
	matches,
	players,
	auth,
	ui,
	tournament,
})
export default createReducers