import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchTournamentDetails } from '../../store/tournaments/actions'
import { getReadableDate } from '../../utils'
import TournamentRankingList from './TournamentRankingList'
import TournamentRound from '../shared/TournamentRound/TournamentRound'
import './TournamentDetails.scss'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen';

class TournamentDetails extends React.Component {

    componentDidMount() {
        this.updateDetailsIfNecessary()
    }

    componentDidUpdate(prevProps) {
        if(prevProps)
            this.updateDetailsIfNecessary(prevProps.tournamentId)
    }

    updateDetailsIfNecessary(prevId) {
        const { tournamentId, fetchTournamentDetails } = this.props
        if(tournamentId && prevId !== tournamentId && typeof fetchTournamentDetails === "function")
            fetchTournamentDetails(tournamentId)
    }

    render() {
        const { isFetching, tournamentDetails } = this.props
        if(!tournamentDetails && isFetching) return <LoadingScreen />
        if(!tournamentDetails) return null

        const createdString = getReadableDate(new Date(this.props.tournamentDetails.created))
        const rounds = (tournamentDetails.matches) ? tournamentDetails.matches.map((matches, index) => <TournamentRound key={index} roundNumber={index + 1} matches={matches} />) : null
        return (
            <div id="TournamentDetails">
                <h1>{ tournamentDetails.tournamentName }</h1>
                <div class="split-container">
                    <TournamentRankingList />
                    <div class="tournament-info">
                        <div><b>Created:</b> { createdString }</div>
                        <div><b>Double rounds:</b> { (tournamentDetails.options.double) ? 'Yes' : 'No'}</div>
                        <div><b><span class="verbose-info">Number of </span><span class="non-verbose-info">rounds:</span></b> { tournamentDetails.matches.length }</div>
                        <div><b><span class="verbose-info">Number of </span><span class="non-verbose-info">matches:</span></b> { _.flatten(tournamentDetails.matches).length }</div>
                        <div><b><span class="verbose-info">Matches </span><span class="non-verbose-info">remaining:</span></b> { _.flatten(tournamentDetails.matches).filter(match => match.winner == undefined).length }</div>
                    </div>
                </div>
                <div class="round-container">
                    { rounds }
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