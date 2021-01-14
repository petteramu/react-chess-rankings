import React from 'react'
import './TournamentRound.scss'
import { showAddTournamentGamePopup, showUpdateTournamentMatchPopup } from '../../../store/ui/actions'
import { connect } from 'react-redux'
import MatchResult from '../MatchResult/MatchResult'

function TournamentRound(props) {
    const { matches, roundNumber } = props

    function onClick(match) {
        if (match.winner) props.updateResult(match)
        else props.addResult(match)
    }

    return (
        <div className="tournament-round">
            <h3>
                Round { roundNumber }
            </h3>
            { matches.map((match) => <MatchResult onClick={onClick.bind(this, match)} key={match.id} match={match} />) }
        </div>
    )
}

function mapDispatch(dispatch) {
    return {
        addResult: (match) => dispatch(showAddTournamentGamePopup(match)),
        updateResult: (match) => dispatch(showUpdateTournamentMatchPopup(match))
    }
}

export default connect(null, mapDispatch)(TournamentRound)