import React from 'react'

function MatchResultPlayer(props) {
    let { playerName, mmrChange, score } = props
    mmrChange = (mmrChange > 0) ? `+${Math.round(mmrChange)}` : Math.round(mmrChange)

    let classes = ['match-result-player']
    if (score === 1) classes.push('winner')
    if (score === 0) classes.push('loser')

    return (
        <div className={classes.join(' ')}>{playerName} ({mmrChange})</div>
    )
}

export default MatchResultPlayer