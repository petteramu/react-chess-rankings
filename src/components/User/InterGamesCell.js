import React from 'react'
import './InterGamesCell.scss'

function InterGamesRow(props) {
    const { letter, amount } = props
    return (
        <span className="inter-games-row"><span className="inter-games-letter">{ letter }</span>{ amount }</span>
    )
}

export default InterGamesRow