import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTournamentDetails } from '../../store/tournaments/actions'
import { getReadableDate } from '../../utils'
import TournamentRankingList from './TournamentRankingList'
import TournamentRound from '../shared/TournamentRound/TournamentRound'
import './TournamentDetails.scss'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen'
import { MatchPropType } from '../../utils/propTypes'

class TournamentDetails extends React.Component {
    componentDidMount() {
        this.updateDetailsIfNecessary()
    }

    componentDidUpdate(prevProps) {
        if (prevProps) {this.updateDetailsIfNecessary(prevProps.tournamentId)}
    }

    updateDetailsIfNecessary(prevId) {
        const { tournamentId, fetchTournamentDetails } = this.props
        if (tournamentId && prevId !== tournamentId && typeof fetchTournamentDetails === 'function') {fetchTournamentDetails(tournamentId)}
    }

    render() {
        const {
            isFetching,
            tournamentDetails:
            {
                created,
                matches,
                id,
                options: { double },
            },
            tournamentId,
        } = this.props

        if ((!tournamentId !== id) && isFetching) return <LoadingScreen />
        if (!tournamentDetails) return null

        const createdString = getReadableDate(new Date(created))
        const rounds = (matches) ? matches.map((round, index) => <TournamentRound key={index} roundNumber={index + 1} matches={round} />) : null
        return (
            <div id="TournamentDetails">
                <h1>{ tournamentName }</h1>
                <div className="split-container">
                    <TournamentRankingList />
                    <div className="tournament-info">
                        <div>
                            <b>Created:</b> 
                            {' '}
                            { createdString }
                        </div>
                        <div>
                            <b>Double rounds:</b> 
                            {' '}
                            { (double) ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <b>
                                <span className="verbose-info">Number of </span>
                                <span className="non-verbose-info">rounds:</span>
                            </b>
                            {' '}
                            { matches.length }
                        </div>
                        <div>
                            <b>
                                <span className="verbose-info">Number of </span>
                                <span className="non-verbose-info">matches:</span>
                            </b>
                            {' '}
                            { _.flatten(matches).length }
                        </div>
                        <div>
                            <b>
                                <span className="verbose-info">Matches </span>
                                <span className="non-verbose-info">remaining:</span>
                            </b>
                            {' '}
                            { _.flatten(matches).filter((match) => match.winner === undefined).length }
                        </div>
                    </div>
                </div>
                <div className="round-container">
                    { rounds }
                </div>
            </div>
        )
    }
}

TournamentDetails.propTypes = {
    tournamentDetails: PropTypes.shape({
        matches: PropTypes.arrayOf(MatchPropType).isRequired,
        id: PropTypes.string.isRequired,
        tournamentName: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        options: PropTypes.shape({
            double: PropTypes.bool,
        }),
    }).isRequired,
}

function mapState(state) {
    return {
        isFetching: state.tournament.isFetching,
        tournamentDetails: state.tournament.details,
    }
}

function mapDispatch(dispatch) {
    return {
        fetchTournamentDetails: (id) => dispatch((fetchTournamentDetails(id))),
    }
}

export default connect(mapState, mapDispatch)(TournamentDetails)
