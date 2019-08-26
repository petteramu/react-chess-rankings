import {
    SHOW_ADD_GAME_POPUP,
    HIDE_ADD_GAME_POPUP,
    SHOW_ADD_PLAYER_POPUP,
    HIDE_ADD_PLAYER_POPUP,
    SET_USER_MATCH_HISTORY_FILTER,
    SHOW_ADD_TOURNAMENT_POPUP,
    HIDE_ADD_TOURNAMENT_POPUP,
    SHOW_ADD_TOURNAMENT_GAME_POPUP,
    HIDE_ADD_TOURNAMENT_GAME_POPUP,
    SHOW_MOBILE_MENU,
    HIDE_MOBILE_MENU,
    SHOW_DELETE_MATCH_POPUP,
    HIDE_DELETE_MATCH_POPUP,
} from './actions'
import {
    SHOW_UPDATE_TOURNAMENT_MATCH_POPUP,
    HIDE_UPDATE_TOURNAMENT_MATCH_POPUP
} from '../ui/actions'

const initialUiState = {
    addGameVisible: false,
    addPlayerVisible: false,
    addTournamentVisible: false,
    addTournamentGameVisible: false,
    addTournamentGameData: undefined,
    userMatchFilter: undefined,
    mobileMenuVisible: false,
    deleteGameVisible: false,
    deleteGameData: undefined,
    updateTournamentGameData: undefined,
    updateTournamentGameVisible: false
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
        case SHOW_ADD_TOURNAMENT_POPUP:
            return Object.assign({}, state,  { addTournamentVisible: true })
        case HIDE_ADD_TOURNAMENT_POPUP:
            return Object.assign({}, state,  { addTournamentVisible: false })
        case SHOW_ADD_TOURNAMENT_GAME_POPUP:
            return Object.assign({}, state,  { addTournamentGameVisible: true, addTournamentGameData: action.payload })
        case HIDE_ADD_TOURNAMENT_GAME_POPUP:
            return Object.assign({}, state,  { addTournamentGameVisible: false, addTournamentGameData: undefined })
        case SHOW_MOBILE_MENU:
            return Object.assign({}, state, { mobileMenuVisible: true })
        case HIDE_MOBILE_MENU:
            return Object.assign({}, state, { mobileMenuVisible: false })
        case SHOW_DELETE_MATCH_POPUP:
            return Object.assign({}, state, { deleteGameVisible: true, deleteGameData: action.payload })
        case HIDE_DELETE_MATCH_POPUP:
            return Object.assign({}, state, { deleteGameVisible: false, deleteGameData: undefined })
        case SHOW_UPDATE_TOURNAMENT_MATCH_POPUP:
            return Object.assign({}, state, { updateTournamentGameVisible: true, updateTournamentGameData: action.payload })
        case HIDE_UPDATE_TOURNAMENT_MATCH_POPUP:
            return Object.assign({}, state, { updateTournamentGameVisible: false, updateTournamentGameData: undefined })
        default:
            return state
    }
}

export default ui