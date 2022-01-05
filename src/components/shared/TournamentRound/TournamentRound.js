import React from 'react'
import './TournamentRound.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { showAddTournamentGamePopup, showUpdateTournamentMatchPopup } from '../../../store/ui/actions'
import MatchResult from '../MatchResult/MatchResult'
import { MatchPropType } from '../../../utils/propTypes'

function TournamentRound(props) {
    const {
        matches,
        roundNumber,
        updateResult,
        addResult,
    } = props

    function onClick(match) {
        if (match.winner) updateResult(match)
        else addResult(match)
    }

    return (
        <div className="tournament-round">
            <h3>
                Round
                {' '}
                { roundNumber }
            </h3>
            { matches.map((match) => (
                <MatchResult onClick={onClick} key={match.id} match={match} />
            ))}
        </div>
    )
}

function mapDispatch(dispatch) {
    return {
        addResult: (match) => dispatch(showAddTournamentGamePopup(match)),
        updateResult: (match) => dispatch(showUpdateTournamentMatchPopup(match)),
    }
}

TournamentRound.propTypes = {
    matches: PropTypes.arrayOf(MatchPropType).isRequired,
    roundNumber: PropTypes.number.isRequired,
    updateResult: PropTypes.func.isRequired,
    addResult: PropTypes.func.isRequired,
}

export default connect(null, mapDispatch)(TournamentRound)
