import { push } from 'connected-react-router'
import { url } from '../../configs/LambdaConfig'
import { hideAddTournamentPopup } from '../ui/actions'

const REQUEST_TOURNAMENTS = 'REQUEST_TOURNAMENTS'
const RECEIVE_TOURNAMENTS = 'RECEIVE_TOURNAMENTS'
const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT'
const RECEIVE_ACTIVE_TOURNAMENT = 'RECEIVE_ACTIVE_TOURNAMENT'

const requestTournaments = () => ({ type: REQUEST_TOURNAMENTS })
const receiveTournaments = (tournaments) => ({ type: RECEIVE_TOURNAMENTS, payload: tournaments })
const receiveActiveTournament = (tournament) => ({
    type: RECEIVE_ACTIVE_TOURNAMENT,
    payload: tournament,
})

function fetchTournaments() {
    return function performFetchTournaments(dispatch) {
        dispatch(requestTournaments())

        fetch(`${url}/tournaments`, {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json(), (error) => console.log(error))
            .then((jsonResponse) => {
                if (typeof jsonResponse === 'object') dispatch(receiveTournaments(jsonResponse))
                else dispatch(receiveTournaments())
            })
    }
}

function createTournament(tournament) {
    return function create(dispatch) {
        dispatch(requestTournaments())

        const body = {
            players: tournament.participants.map((player) => player.name),
            name: tournament.name,
            options: {
                double: tournament.double,
            },
        }

        fetch(`${url}/tournament`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
        })
            .then((response) => response.json(), (error) => console.log(error))
            .then((jsonResponse) => {
                dispatch(hideAddTournamentPopup())
                dispatch(push(`/tournament/${jsonResponse.id}`))
            })
    }
}

function fetchTournamentDetails(tournamentId) {
    return function fetchDetails(dispatch) {
        dispatch(requestTournaments())

        fetch(`${url}/tournament/?id=${tournamentId}`, {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json(), (error) => console.log(error))
            .then((jsonResponse) => dispatch(receiveActiveTournament(jsonResponse)))
    }
}

function submitTournamentGame({ white, black, winner, id }) {
    async function deleteGameIfNecessary(allMatches) {
        const existing = allMatches.find((match) => match.id === id)
        if (existing) {
            await fetch(`${url}/game/${id}`, {
                method: 'DELETE',
                mode: 'cors',
            })
        }
    }
    return async function performAction(dispatch, getState) {
        try {
            await deleteGameIfNecessary(getState().matches.matches)
            await fetch(`${url}/game`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ white, black, winner, id }),
            })
            const tournament = (getState().tournament) ? getState().tournament.details : null
            if (tournament) dispatch(fetchTournamentDetails(tournament.id))
        }
        catch (error) {
            console.log(error)
        }
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
    submitTournamentGame,
}
