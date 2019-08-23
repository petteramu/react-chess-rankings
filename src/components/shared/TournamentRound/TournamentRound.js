import React from 'react'
import './TournamentRound.scss'
import { showAddTournamentGamePopup } from '../../../store/ui/actions'
import { connect } from 'react-redux'
import MatchResult from '../MatchResult/MatchResult'

function TournamentRound(props) {
    const { matches, roundNumber } = props
    return (
        <div class="tournament-round">
            <h3>Round { roundNumber }</h3>
            { matches.map((match) => <MatchResult onClick={props.onMatchClicked} key={match.id} match={match} />) }
        </div>
    )
}

function mapDispatch(dispatch) {
    return {
        onMatchClicked: (match) => dispatch(showAddTournamentGamePopup(match))
    }
}

export default connect(null, mapDispatch)(TournamentRound)