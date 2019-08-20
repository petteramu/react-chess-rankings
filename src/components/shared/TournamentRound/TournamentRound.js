import React from 'react'
import './TournamentRound.scss'
import { showAddTournamentGamePopup } from '../../../store/ui/actions'
import { connect } from 'react-redux'

function TournamentRoundMatch(props) {
    let whiteScore, blackScore;
    const { match } = props
    if(!match) return null
    const { white, black, winner, timestamp } = match
    if(match.winner) {
        whiteScore = match.winner === 'white' ? 1 : (match.winner === 'remis') ? <>&#189;</> : 0
        let whiteClasses = "tournament-round-match-score"
        whiteClasses += (whiteScore === 1) ?  " winner" : (whiteScore === 0) ? " loser" : ""
        whiteScore = <div className={whiteClasses}>{ whiteScore }</div>

        blackScore = match.winner === 'black' ? 1 : (match.winner === 'remis') ? <>&#189;</> : 0
        let blackClasses = "tournament-round-match-score"
        blackClasses += (blackScore === 1) ? " winner" : (blackScore === 0) ? " loser" : ""
        blackScore = <div className={blackClasses}>{ blackScore }</div>
    }
    return (
        <div class="tournament-round-match" onClick={props.onClick.bind(this, match)}>
            { whiteScore }
            <div class="tournament-round-match-player">{ white.key }</div>
            <div class="tournament-round-match-vs">vs</div>
            <div class="tournament-round-match-player">{ black.key }</div>
            { blackScore }
        </div>
    )
}

function TournamentRound(props) {
    const { matches, roundNumber } = props
    return (
        <div class="tournament-round">
            <h3>Round { roundNumber }</h3>
            { matches.map((match) => <TournamentRoundMatch onClick={props.onMatchClicked} key={match.id} match={match} />) }
        </div>
    )
}

function mapDispatch(dispatch) {
    return {
        onMatchClicked: (match) => (!match.winner) ? dispatch(showAddTournamentGamePopup(match)) : null
    }
}

export default connect(null, mapDispatch)(TournamentRound)
export {
    TournamentRoundMatch
}