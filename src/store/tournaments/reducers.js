import { REQUEST_TOURNAMENTS, RECEIVE_TOURNAMENTS } from './actions'

const initialState = {
    tournaments: []
}

function tournaments(state = initialState, action) {
    switch(action.type) {
        case REQUEST_TOURNAMENTS:
            return Object.assign({}, state, { isFetching: true })
        case RECEIVE_TOURNAMENTS:
            return Object.assign({}, state, { tournaments: payload, isFetching: false })
        default:
            return state
    }
}

export default tournaments