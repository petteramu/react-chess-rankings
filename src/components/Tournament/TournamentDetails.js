import React from 'react'
import { connect } from 'react-redux'
import { fetchTournamentDetails } from '../../store/tournaments/actions'
import TournamentRound from '../shared/TournamentRound/TournamentRound'
import './TournamentDetails.scss'

class TournamentDetails extends React.Component {

    componentDidMount() {
        this.updateDetailsIfNecessary()
    }

    componentDidUpdate(prevProps) {
        if(prevProps)
            this.updateDetailsIfNecessary(prevProps.tournamentId)
    }

    updateDetailsIfNecessary(prevId) {
        console.log(this.props)
        const { tournamentId, fetchTournamentDetails } = this.props
        if(tournamentId && prevId !== tournamentId && typeof fetchTournamentDetails === "function")
            fetchTournamentDetails(tournamentId)
    }

    render() {
        const { isFetching, tournamentDetails } = this.props
        if(isFetching || !tournamentDetails) return <h1>Loading...</h1>
        return (
            <div id="TournamentDetails">
                <h1>{ tournamentDetails.tournamentName }</h1>
                <div class="round-container">
                    { tournamentDetails.matches.map((matches, index) => <div class="tournament-round"><TournamentRound roundNumber={index + 1}matches={matches} /></div>)}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        isFetching: state.tournament.isFetching,
        tournamentDetails: state.tournament.details
    }
}

function mapDispatch(dispatch) {
    return {
        fetchTournamentDetails: (id) => dispatch((fetchTournamentDetails(id)))
    }
}

export default connect(mapState, mapDispatch)(TournamentDetails)