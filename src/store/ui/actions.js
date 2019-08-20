const HIDE_ADD_TOURNAMENT_POPUP = 'HIDE_ADD_TOURNAMENT_POPUP'
const SHOW_ADD_TOURNAMENT_POPUP = 'SHOW_ADD_TOURNAMENT_POPUP'
const HIDE_ADD_GAME_POPUP = 'HIDE_ADD_GAME_POPUP'
const SHOW_ADD_GAME_POPUP = 'SHOW_ADD_GAME_POPUP'
const HIDE_ADD_PLAYER_POPUP = 'HIDE_ADD_PLAYER_POPUP'
const SHOW_ADD_PLAYER_POPUP = 'SHOW_ADD_PLAYER_POPUP'
const SET_USER_MATCH_HISTORY_FILTER = 'SET_USER_MATCH_HISTORY_FILTER'
const SHOW_ADD_TOURNAMENT_GAME_POPUP = 'SHOW_ADD_TOURNAMENT_GAME_POPUP'
const HIDE_ADD_TOURNAMENT_GAME_POPUP = 'HIDE_ADD_TOURNAMENT_GAME_POPUP'

const showAddTournamentGamePopup = (match) => { return { type: SHOW_ADD_TOURNAMENT_GAME_POPUP, payload: match } }
const hideAddTournamentGamePopup = () => { return { type: HIDE_ADD_TOURNAMENT_GAME_POPUP } }
const showAddTournamentPopup = () => { return { type: SHOW_ADD_TOURNAMENT_POPUP }}
const hideAddTournamentPopup = () => { return { type: HIDE_ADD_TOURNAMENT_POPUP }}
const showAddGamePopup = () => { return { type: SHOW_ADD_GAME_POPUP } }
const hideAddGamePopup = () => { return { type: HIDE_ADD_GAME_POPUP } }
const showAddPlayerPopup = () => { return { type: SHOW_ADD_PLAYER_POPUP } }
const hideAddPlayerPopup = () => { return { type: HIDE_ADD_PLAYER_POPUP } }

function setUserMatchHistoryFilter(filter) { 
    return  {
        type: SET_USER_MATCH_HISTORY_FILTER,
        payload: filter
    }
}

export {
    SHOW_ADD_TOURNAMENT_POPUP,
    HIDE_ADD_TOURNAMENT_POPUP,
    HIDE_ADD_GAME_POPUP,
    SHOW_ADD_GAME_POPUP,
    HIDE_ADD_PLAYER_POPUP,
    SHOW_ADD_PLAYER_POPUP,
    SET_USER_MATCH_HISTORY_FILTER,
    SHOW_ADD_TOURNAMENT_GAME_POPUP,
    HIDE_ADD_TOURNAMENT_GAME_POPUP,
    showAddTournamentPopup,
    hideAddTournamentPopup,
    showAddGamePopup,
    hideAddGamePopup,
    showAddPlayerPopup,
    hideAddPlayerPopup,
    setUserMatchHistoryFilter,
    showAddTournamentGamePopup,
    hideAddTournamentGamePopup
}