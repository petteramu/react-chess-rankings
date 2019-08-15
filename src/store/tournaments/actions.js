import { url } from '../../configs/LambdaConfig'

const REQUEST_TOURNAMENTS = 'REQUEST_TOURNAMENTS'
const RECEIVE_TOURNAMENTS = 'RECEIVE_TOURNAMENTS'
const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT'

const requestTournaments = () => { return { type: REQUEST_TOURNAMENTS } }
const receiveTournaments = (tournaments) => { return {
        type: RECEIVE_TOURNAMENTS,
        payload: tournaments
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
        .then((jsonResponse) => dispatch(receiveTournaments(jsonResponse)))
    }
}

function createTournament(tournament) {
    return function(dispatch) {
        dispatch(requestTournaments())

        const body = {
            players: tournament.participants.map((player) => player.name),
            title: tournament.name,
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

export {
    REQUEST_TOURNAMENTS,
    RECEIVE_TOURNAMENTS,
    CREATE_TOURNAMENT,
    receiveTournaments,
    fetchTournaments,
    createTournament
}