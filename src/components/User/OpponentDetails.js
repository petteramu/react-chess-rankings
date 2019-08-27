import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import './OpponentDetails.scss'
import Table from '../shared/Table/Table'
import { FaChessKnight } from 'react-icons/fa'
import { MdExpandMore } from 'react-icons/md'
import InterGamesCell from './InterGamesCell'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

function OpponentDetails(props) {
    const { opponent, lastFive, wins, remis, losses, whiteWins, whiteRemis, whiteLosses, blackWins, blackRemis, blackLosses } = props
    const tableData = [
        ['Total:', <InterGamesCell letter="W" amount={wins} />, <InterGamesCell letter="R" amount={remis} />, <InterGamesCell letter="L" amount={losses} />],
        ['White:', <InterGamesCell letter="W" amount={whiteWins} />, <InterGamesCell letter="R" amount={whiteRemis} />, <InterGamesCell letter="L" amount={whiteLosses} />],
        ['Black:', <InterGamesCell letter="W" amount={blackWins} />, <InterGamesCell letter="R" amount={blackRemis} />, <InterGamesCell letter="L" amount={blackLosses} />]
    ]

    function getLastFiveClasses(match) {
        const classes = []
        classes.push((match.winner) ? 'winner' : 'loser')
        classes.push((match.color))
        return classes.join(' ')
    }

    return (
        <ExpansionPanel className="opponent-details">
            <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls={`userDetails_${opponent.name}`}>

                <span class="opponentName">{ opponent.name }<small>#{ Math.round(opponent.ranking) }</small></span>
                <div class="history">
                    { lastFive.map((match) => <span className={getLastFiveClasses(match)}><FaChessKnight size="25" /></span>)}
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                id={`userDetails_${opponent.name}`}>

                <div className="half-container">
                    <Table data={tableData} />
                </div>
                <div className="half-container">
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

function mapState(state, ownProps) {
    const { selfName, opponent } = ownProps
    const opponentName = opponent.name
    const matches = _.filter(state.matches.matches, (match) => {
        return (match.white.key === selfName || match.black.key === selfName)
            && (match.white.key === opponentName || match.black.key === opponentName)
    })

    const whiteMatches = _.filter(matches, (match) => match.white.key === selfName)
    const whiteWins = _.filter(whiteMatches, (match) => match.winner === 'white').length
    const whiteRemis = _.filter(whiteMatches, (match) => match.winner === 'remis').length
    const whiteLosses = _.filter(whiteMatches, (match) => match.winner === 'black').length

    const blackMatches = _.filter(matches, (match) => match.black.key === selfName)
    const blackWins = _.filter(blackMatches, (match) => match.winner === 'black').length
    const blackRemis = _.filter(blackMatches, (match) => match.winner === 'remis').length
    const blackLosses = _.filter(blackMatches, (match) => match.winner === 'white').length

    const wins = whiteWins + blackWins
    const remis = whiteRemis + blackRemis
    const losses = whiteLosses + blackLosses

    const lastFive = matches.slice(0, 5).map((match) => {
        if(match.white.key === selfName)
            return { color: 'white',  winner: match.winner === 'white' }
        else if(match.black.key === selfName)
            return { color: 'black', winner: match.winner === 'black' }
        else
            return undefined
    }).reverse()

    return { opponent, lastFive, whiteWins, whiteRemis, whiteLosses, blackWins, blackRemis, blackLosses, wins, remis, losses }
}

export default connect(mapState)(OpponentDetails)