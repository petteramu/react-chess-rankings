import React from 'react'
import PropTypes from 'prop-types'
import './InterGamesCell.scss'

function InterGamesRow(props) {
    const { letter, amount } = props
    return (
        <span className="inter-games-row">
            <span className="inter-games-letter">{ letter }</span>
            { amount }
        </span>
    )
}

InterGamesRow.propTypes = {
    letter: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
}

export default InterGamesRow
