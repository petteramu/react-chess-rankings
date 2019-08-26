import React from 'react'
import './TournamentRound.scss'
import { showAddTournamentGamePopup, showDeleteMatchPopup } from '../../../store/ui/actions'
import { connect } from 'react-redux'
import MatchResult from '../MatchResult/MatchResult'

function TournamentRound(props) {
    const { matches, roundNumber } = props

    function onClick(match) {
        if(match.winner)
            props.removeResult(match)
        else
            props.addResult(match)
    }

    return (
        <div class="tournament-round">
            <h3>Round { roundNumber }</h3>
            { matches.map((match) => <MatchResult onClick={onClick.bind(this, match)} key={match.id} match={match} />) }
        </div>
    )
}

function mapDispatch(dispatch) {
    return {
        addResult: (match) => dispatch(showAddTournamentGamePopup(match)),
        removeResult: (match) => dispatch(showDeleteMatchPopup(match))
    }
}

export default connect(null, mapDispatch)(TournamentRound)