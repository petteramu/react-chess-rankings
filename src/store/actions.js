import { url, bucket } from '../configs/LambdaConfig'

const REQUEST_MATCHES = 'REQUEST_MATCHES'
const REQUEST_PLAYERS = 'REQUEST_PLAYERS'
const RECEIVE_MATCHES = 'RECEIVE_MATCHES'
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS'
const PREVIOUS_PAGE = 'PREVIOUS_PAGE'
const NEXT_PAGE = 'NEXT_PAGE'
const STORE_JWT = 'STORE_JWT'

function deleteGame(id, accessToken) {
    return function(dispatch) {
        fetch(`${url}/game/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then(() => {
            dispatch(fetchPlayers())
            dispatch(fetchMatches())
        })
    }
}

function addPlayer(name, accessToken) {
    return function(dispatch) {
        fetch(`${url}/player`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ name })
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then(() => dispatch(fetchPlayers()))
    }
}

function submitGame({ white, black, winner, id }, accessToken) {
    return function(dispatch) {
        fetch(`${url}/game`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ white, black, winner, id })
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => {
            dispatch(fetchMatches())
            dispatch(fetchPlayers())
        })
    }
}

function fetchMatchesAndPlayers() {
    return function (dispatch) {
        dispatch(requestMatches())
        dispatch(requestPlayers())

        fetch(`https://${bucket}.s3.eu-central-1.amazonaws.com/rankings-and-matches`)
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => {
            if (!jsonResponse.rankings) {
                dispatch(fetchMatches())
                dispatch(fetchPlayers())
            }
            else {
                dispatch(receivePlayers(jsonResponse.rankings))
                dispatch(receiveMatches(jsonResponse.games))
            }
        })
        .catch(err => {
            // Fallback to fetch via lambda functions
            dispatch(fetchMatches())
            dispatch(fetchPlayers())
        })
    }
}

function fetchMatches() {
    return function(dispatch) {
        dispatch(requestMatches())

        fetch(`${url}/games`, {
            method: 'GET',
            mode: 'cors'
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => dispatch(receiveMatches(jsonResponse)))
    }
}

function fetchPlayers() {
    return function(dispatch) {
        dispatch(requestPlayers())

        fetch(`${url}/rankings`, {
            method: 'GET',
            mode: 'cors'
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => dispatch(receivePlayers(jsonResponse)))
    }
}

function storeJwt(token) {
    return {
        type: STORE_JWT,
        payload: token
    }
}

function requestMatches() {
    return {
        type: REQUEST_MATCHES
    }
}

function requestPlayers() {
    return {
        type: REQUEST_PLAYERS
    }
}

function receivePlayers(players) {
    return {
        type: RECEIVE_PLAYERS,
        payload: players
    }
}

function receiveMatches(matches) {
    return {
        type: RECEIVE_MATCHES,
        payload: matches
    }
}

function nextPage() {
    return {
        type: NEXT_PAGE
    }
}

function previousPage() {
    return {
        type: PREVIOUS_PAGE
    }
}

export {
    REQUEST_MATCHES,
    REQUEST_PLAYERS,
    RECEIVE_MATCHES,
    RECEIVE_PLAYERS,
    PREVIOUS_PAGE,
    NEXT_PAGE,
    STORE_JWT,
    receiveMatches,
    receivePlayers,
    requestPlayers,
    requestMatches,
    fetchMatches,
    fetchPlayers,
    fetchMatchesAndPlayers,
    nextPage,
    previousPage,
    addPlayer,
    submitGame,
    deleteGame,
    storeJwt
}