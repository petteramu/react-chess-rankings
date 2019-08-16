import React from 'react'
import './TournamentRound.scss'
import _ from 'lodash'
import { FaChessKnight } from 'react-icons/fa'

function TournamentRoundMatch(props) {
    const { white, black, winner, timestamp } = props
    
    return (
        <div class="tournament-round-match">
            <div class="tournament-round-match-player">{ white.key }</div>
            <div class="tournament-round-match-vs">vs</div>
            <div class="tournament-round-match-player">{ black.key }</div>
        </div>
    )
}

function TournamentRound(props) {
    const { matches, roundNumber } = props
    return (
        <div class="tournament-round">
            <h3>Round: { roundNumber }</h3>
            { matches.map((match) => <TournamentRoundMatch { ...match } />) }
        </div>
    )
}

export default TournamentRound
export {
    TournamentRoundMatch
}