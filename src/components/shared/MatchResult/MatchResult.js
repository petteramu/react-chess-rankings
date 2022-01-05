import React from 'react'
import './MatchResult.scss'
import PropTypes from 'prop-types'
import { getReadableDayMonth } from '../../../utils'
import { MatchPropType } from '../../../utils/propTypes'

function MatchResult(props) {
    const { match, onClick } = props

    function getScoreElement(color) {
        let classes = `${color} match-result-score`
        if (match.winner === color) {
            classes += ' winner'
        } else if (match.winner !== 'remis') {
            classes += ' loser'
        }
        return <div className={classes} />
    }

    function onKeyDown(evt) {
        if (evt.keyCode === 13 && onClick !== null) {
            onClick(match)
        }
    }

    function onClickWithContext() {
        if (onClick) {
            onClick(match)
        }
    }

    if (!match) return null
    const { white, black, timestamp } = match

    const readableDate = getReadableDayMonth(new Date(timestamp))
    const whiteChange = (match.white.change > 0) ? `+${Math.round(match.white.change)}` : Math.round(match.white.change)
    const blackChange = (match.black.change > 0) ? `+${Math.round(match.black.change)}` : Math.round(match.black.change)

    const mainClasses = (match.winner) ? 'match-result with-result' : 'match-result'

    return (
        <li className={mainClasses}>
            <div role="button" tabIndex="0" onClick={onClickWithContext} onKeyDown={onKeyDown}>
                { match.winner && getScoreElement('white') }
                <div className="match-result-player white">{ white.key }</div>
                <div className="match-result-vs">vs</div>
                <div className="match-result-player black">{ black.key }</div>
                { match.winner
                    && (
                        <>
                            { getScoreElement('black') }
                            <div className="info-row white-change">{ whiteChange }</div>
                            <div className="info-row date">{ readableDate }</div>
                            <div className="info-row black-change">{ blackChange }</div>
                        </>
                    )}
            </div>
        </li>
    )
}

MatchResult.propTypes = {
    match: MatchPropType.isRequired,
    onClick: PropTypes.func,
}

MatchResult.defaultProps = {
    onClick: null,
}

export default MatchResult
