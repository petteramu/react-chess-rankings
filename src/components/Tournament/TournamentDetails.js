import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchTournamentDetails } from '../../store/tournaments/actions'
import TournamentRankingList from './TournamentRankingList'
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

    getReadableCreatedDate() {
        const created = new Date(this.props.tournamentDetails.created)
        let hours = (created.getHours() < 10) ? '0' + created.getHours() : created.getHours()
        let minutes = (created.getMinutes() < 10) ? '0' + created.getMinutes() : created.getMinutes()
        return `${created.getDate()}/${created.getMonth()}/${created.getFullYear()} ${hours}:${minutes}`
    }

    render() {
        const { isFetching, tournamentDetails } = this.props
        if(isFetching) return <h1>Loading...</h1>
        if(!tournamentDetails) return <h1>Tournament not found...</h1>

        const createdString = this.getReadableCreatedDate()
        const rounds = (tournamentDetails.matches) ? tournamentDetails.matches.map((matches, index) => <div class="tournament-round"><TournamentRound roundNumber={index + 1} matches={matches} /></div>) : null
        return (
            <div id="TournamentDetails">
                <h1>{ tournamentDetails.tournamentName }</h1>
                <div class="split-container">
                    <TournamentRankingList />
                    <div class="tournament-info">
                        <div><b>Created:</b> { createdString }</div>
                        <div><b>Double rounds:</b> { (tournamentDetails.options.double) ? 'Yes' : 'No'}</div>
                        <div><b>Number of rounds:</b> { tournamentDetails.matches.length }</div>
                        <div><b>Number of matches:</b> { _.flatten(tournamentDetails.matches).length }</div>
                        <div><b>Matches remaining:</b> { _.flatten(tournamentDetails.matches).filter(match => match.winner == undefined).length }</div>
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