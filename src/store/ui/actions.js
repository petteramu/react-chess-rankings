const HIDE_ADD_TOURNAMENT_POPUP = 'HIDE_ADD_TOURNAMENT_POPUP'
const SHOW_ADD_TOURNAMENT_POPUP = 'SHOW_ADD_TOURNAMENT_POPUP'
const HIDE_ADD_GAME_POPUP = 'HIDE_ADD_GAME_POPUP'
const SHOW_ADD_GAME_POPUP = 'SHOW_ADD_GAME_POPUP'
const HIDE_ADD_PLAYER_POPUP = 'HIDE_ADD_PLAYER_POPUP'
const SHOW_ADD_PLAYER_POPUP = 'SHOW_ADD_PLAYER_POPUP'
const SET_USER_MATCH_HISTORY_FILTER = 'SET_USER_MATCH_HISTORY_FILTER'
const SHOW_ADD_TOURNAMENT_GAME_POPUP = 'SHOW_ADD_TOURNAMENT_GAME_POPUP'
const HIDE_ADD_TOURNAMENT_GAME_POPUP = 'HIDE_ADD_TOURNAMENT_GAME_POPUP'
const SHOW_MOBILE_MENU = 'SHOW_MOBILE_MENU'
const HIDE_MOBILE_MENU = 'HIDE_MOBILE_MENU'
const SHOW_DELETE_MATCH_POPUP = 'SHOW_DELETE_MATCH_POPUP'
const HIDE_DELETE_MATCH_POPUP = 'HIDE_DELETE_MATCH_POPUP'
const SHOW_UPDATE_TOURNAMENT_MATCH_POPUP = 'SHOW_UPDATE_TOURNAMENT_MATCH_POPUP'
const HIDE_UPDATE_TOURNAMENT_MATCH_POPUP = 'HIDE_UPDATE_TOURNAMENT_MATCH_POPUP'

const showAddTournamentGamePopup = (match) => ({
    type: SHOW_ADD_TOURNAMENT_GAME_POPUP,
    payload: match,
})
const hideAddTournamentGamePopup = () => ({ type: HIDE_ADD_TOURNAMENT_GAME_POPUP })
const showAddTournamentPopup = () => ({ type: SHOW_ADD_TOURNAMENT_POPUP })
const hideAddTournamentPopup = () => ({ type: HIDE_ADD_TOURNAMENT_POPUP })
const showAddGamePopup = () => ({ type: SHOW_ADD_GAME_POPUP })
const hideAddGamePopup = () => ({ type: HIDE_ADD_GAME_POPUP })
const showAddPlayerPopup = () => ({ type: SHOW_ADD_PLAYER_POPUP })
const hideAddPlayerPopup = () => ({ type: HIDE_ADD_PLAYER_POPUP })
const showMobileMenu = () => ({ type: SHOW_MOBILE_MENU })
const hideMobileMenu = () => ({ type: HIDE_MOBILE_MENU })
const showDeleteMatchPopup = (match) => ({ type: SHOW_DELETE_MATCH_POPUP, payload: match })
const hideDeleteMatchPopup = () => ({ type: HIDE_DELETE_MATCH_POPUP })
const hideUpdateTournamentMatchPopup = () => ({ type: HIDE_UPDATE_TOURNAMENT_MATCH_POPUP })
const showUpdateTournamentMatchPopup = (match) => ({
    type: SHOW_UPDATE_TOURNAMENT_MATCH_POPUP,
    payload: match,
})
function setUserMatchHistoryFilter(filter) {
    return {
        type: SET_USER_MATCH_HISTORY_FILTER,
        payload: filter,
    }
}

export {
    SHOW_ADD_TOURNAMENT_POPUP,
    HIDE_ADD_TOURNAMENT_POPUP,
    HIDE_ADD_GAME_POPUP,
    SHOW_DELETE_MATCH_POPUP,
    SHOW_ADD_GAME_POPUP,
    HIDE_DELETE_MATCH_POPUP,
    HIDE_ADD_PLAYER_POPUP,
    SHOW_ADD_PLAYER_POPUP,
    SET_USER_MATCH_HISTORY_FILTER,
    SHOW_ADD_TOURNAMENT_GAME_POPUP,
    HIDE_ADD_TOURNAMENT_GAME_POPUP,
    SHOW_UPDATE_TOURNAMENT_MATCH_POPUP,
    HIDE_UPDATE_TOURNAMENT_MATCH_POPUP,
    SHOW_MOBILE_MENU,
    HIDE_MOBILE_MENU,
    showAddTournamentPopup,
    hideAddTournamentPopup,
    showAddGamePopup,
    hideAddGamePopup,
    showAddPlayerPopup,
    hideAddPlayerPopup,
    setUserMatchHistoryFilter,
    showAddTournamentGamePopup,
    hideAddTournamentGamePopup,
    showMobileMenu,
    hideMobileMenu,
    showDeleteMatchPopup,
    hideDeleteMatchPopup,
    showUpdateTournamentMatchPopup,
    hideUpdateTournamentMatchPopup,
}
