import { REQUEST_TOURNAMENTS, RECEIVE_TOURNAMENTS, RECEIVE_ACTIVE_TOURNAMENT } from './actions'

const initialState = {
    tournaments: [],
    details: undefined,
    isFetching: false
}

function tournament(state = initialState, action) {
    switch(action.type) {
        case REQUEST_TOURNAMENTS:
            return Object.assign({}, state, { isFetching: true })
        case RECEIVE_TOURNAMENTS:
            return Object.assign({}, state, { tournaments: action.payload, isFetching: false })
        case RECEIVE_ACTIVE_TOURNAMENT:
            return Object.assign({}, state, { details: action.payload, isFetching: false })
        default:
            return state
    }
}

export default tournament