import { MATCHES_PER_PAGE } from '../configs'
import { combineReducers } from 'redux'
import ui from './ui/reducers'
import {
    REQUEST_PLAYERS,
    REQUEST_MATCHES,
    RECEIVE_MATCHES,
    RECEIVE_PLAYERS,
    PREVIOUS_PAGE,
    NEXT_PAGE,
} from './actions'

const initialMatchState = {
    matches: [],
    isFetching: false,
    pageNumber: 0
}
function matches(state = initialMatchState, action) {
    switch(action.type) {
        case RECEIVE_MATCHES:
            let obj = Object.assign({}, state, {
                matches: action.payload,
                isFetching: false,
                pageNumber: 0
            })
            return obj

        case REQUEST_MATCHES:
            return Object.assign({}, state, { isFetching: true })

        case NEXT_PAGE:
            let pageNumber = state.pageNumber
            let maxPageNumber = Math.ceil(state.matches.length / MATCHES_PER_PAGE)
            let nextPageNumber = Math.min(maxPageNumber, pageNumber + 1)
            return Object.assign({}, state, { pageNumber: nextPageNumber })

        case PREVIOUS_PAGE:
            let prevPageNumber = Math.max(0, state.pageNumber - 1)
            return Object.assign({}, state, { pageNumber: prevPageNumber })

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
                isFetching: false
            })

        case REQUEST_PLAYERS:
            return Object.assign({}, state, { isFetching: true })

        default:
            return state
    }
}

const rankingsApp = combineReducers({
    matches,
    players,
    ui
})
export default rankingsApp