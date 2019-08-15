import { MATCHES_PER_PAGE } from '../configs'
import { combineReducers } from 'redux'
import {
    REQUEST_PLAYERS,
    REQUEST_MATCHES,
    RECEIVE_MATCHES,
    RECEIVE_PLAYERS,
    PREVIOUS_PAGE,
    NEXT_PAGE,
    SHOW_ADD_GAME_POPUP,
    HIDE_ADD_GAME_POPUP,
    SHOW_ADD_PLAYER_POPUP,
    HIDE_ADD_PLAYER_POPUP,
    SET_USER_MATCH_HISTORY_FILTER
} from './actions'

const initialUiState = {
    addGameVisible: false,
    addPlayerVisible: false,
    userMatchFilter: undefined,
}
function ui(state = initialUiState, action) {
    switch(action.type) {
        case SHOW_ADD_GAME_POPUP:
            return Object.assign({}, state, { addGameVisible: true })
        case HIDE_ADD_GAME_POPUP:
            return Object.assign({}, state, { addGameVisible: false })
        case SHOW_ADD_PLAYER_POPUP:
            return Object.assign({}, state, { addPlayerVisible: true })
        case HIDE_ADD_PLAYER_POPUP:
            return Object.assign({}, state, { addPlayerVisible: false })
        case SET_USER_MATCH_HISTORY_FILTER:
            return Object.assign({}, state, { userMatchFilter: action.payload })
        default:
            return state
    }
}

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