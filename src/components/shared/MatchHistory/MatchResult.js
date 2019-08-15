import React from 'react'
import MatchScoreComponent from './MatchScoreComponent'
import MatchResultPlayer from './MatchResultPlayer'

function MatchResult(props) {
    let { match } = props
    let score = [0, 0]
    if(match.winner === 'white') score[0] = 1
    if(match.winner === 'black') score[1] = 1
    if(match.winner === 'remis') {
        score[0] = 0.5
        score[1] = 0.5
    }

    return (
        <li className="match-result">
            <MatchResultPlayer playerName={match.white.key} mmrChange={match.white.change} score={score[0]} />
            <MatchScoreComponent score={score} timestamp={match.timestamp} />
            <MatchResultPlayer playerName={match.black.key} mmrChange={match.black.change} score={score[1]} />
        </li>
    )
}

export default MatchResult