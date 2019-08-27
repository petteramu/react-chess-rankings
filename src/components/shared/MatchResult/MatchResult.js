import React from 'react'
import './MatchResult.scss'
import { getReadableDayMonth } from '../../../utils'

class MatchResult extends React.Component {

    getScoreElement(color, match) {
        let score = match.winner === color ? 1 : (match.winner === 'remis') ? <>&#189;</> : 0
        let classes = `${color} match-result-score`
        classes += (score === 1) ? " winner" : (score === 0) ? " loser" : ""
        return <div className={classes}></div>
    }

    render() {
        const { match, ...other } = this.props
        if(!match) return null
        const { white, black, timestamp } = match
    
        const readableDate = getReadableDayMonth(new Date(timestamp))
        const whiteChange = (match.white.change > 0) ? `+${Math.round(match.white.change)}` : Math.round(match.white.change)
        const blackChange = (match.black.change > 0) ? `+${Math.round(match.black.change)}` : Math.round(match.black.change)
        
        const mainClasses = (match.winner) ? "match-result with-result" : "match-result"
        return (
            <div className={mainClasses} tabIndex="0" onClick={this.props.onClick.bind(this, match)} {...other}>
                { match.winner && this.getScoreElement('white', match) }
                <div className="match-result-player white">{ white.key }</div>
                <div className="match-result-vs">vs</div>
                <div className="match-result-player black">{ black.key }</div>
                { match.winner && 
                    <>
                        { this.getScoreElement('black', match) }
                        <div className="info-row white-change">{ whiteChange }</div>
                        <div className="info-row date">{ readableDate }</div>
                        <div className="info-row black-change">{ blackChange }</div>
                    </>
                }
            </div>
        )
    }
}

export default MatchResult