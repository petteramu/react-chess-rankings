import { url } from '../../configs/LambdaConfig'

const REQUEST_TOURNAMENTS = 'REQUEST_TOURNAMENTS'
const RECEIVE_TOURNAMENTS = 'RECEIVE_TOURNAMENTS'
const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT'
const RECEIVE_ACTIVE_TOURNAMENT = 'RECEIVE_ACTIVE_TOURNAMENT'

const requestTournaments = () => { return { type: REQUEST_TOURNAMENTS } }
const receiveTournaments = (tournaments) => {
    return {
        type: RECEIVE_TOURNAMENTS,
        payload: tournaments
    }
}
const receiveActiveTournament = (tournament) => {
    return {
        type: RECEIVE_ACTIVE_TOURNAMENT,
        payload: tournament
    }
}

function submitTournamentGame({ white, black, winner, id }) {
    return function(dispatch, getState) {
        fetch(`${url}/game`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ white, black, winner, id })
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => {
            const tournament = (getState().tournament) ? getState().tournament.details : null
            if(tournament)
                dispatch(fetchTournamentDetails(tournament.id))
        })
    }
}

function fetchTournaments() {
    return function(dispatch) {
        dispatch(requestTournaments())

        fetch(`${url}/tournaments`, {
            method: 'GET',
            mode: 'cors'
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => {
            if(typeof jsonResponse === 'object')
                dispatch(receiveTournaments(jsonResponse))
            else
                dispatch(receiveTournaments())
        })
    }
}

function createTournament(tournament) {
    return function(dispatch) {
        dispatch(requestTournaments())

        const body = {
            players: tournament.participants.map((player) => player.name),
            name: tournament.name,
            options: {
                double: tournament.double
            }
        }

        fetch(`${url}/tournament`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body)
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then((jsonResponse) => dispatch(fetchTournaments()))
    }
}

function fetchTournamentDetails(tournamentId) {
    return function(dispatch) {
        dispatch(requestTournaments())

        fetch(`${url}/tournament/?id=${tournamentId}`, {
            method: 'GET',
            mode: 'cors'
        })
        .then((response) => response.json(), (error) => console.log(error))
        .then(jsonResponse => dispatch(receiveActiveTournament(jsonResponse)))
    }
}

export {
    REQUEST_TOURNAMENTS,
    RECEIVE_TOURNAMENTS,
    CREATE_TOURNAMENT,
    RECEIVE_ACTIVE_TOURNAMENT,
    receiveTournaments,
    fetchTournaments,
    createTournament,
    receiveActiveTournament,
    fetchTournamentDetails,
    submitTournamentGame
}