import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './OpponentDetails.scss'
import { FaChessKnight } from 'react-icons/fa'
import { MdExpandMore } from 'react-icons/md'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import InterGamesCell from './InterGamesCell'
import Table from '../shared/Table/Table'
import { PlayerPropType, MatchPropType } from '../../utils/propTypes'

function OpponentDetails(props) {
    const {
        opponent,
        lastFive,
        wins,
        remis,
        losses,
        whiteWins,
        whiteRemis,
        whiteLosses,
        blackWins,
        blackRemis,
        blackLosses,
    } = props
    const tableData = [
        ['Total:', <InterGamesCell letter="W" amount={wins} />, <InterGamesCell letter="R" amount={remis} />, <InterGamesCell letter="L" amount={losses} />],
        ['White:', <InterGamesCell letter="W" amount={whiteWins} />, <InterGamesCell letter="R" amount={whiteRemis} />, <InterGamesCell letter="L" amount={whiteLosses} />],
        ['Black:', <InterGamesCell letter="W" amount={blackWins} />, <InterGamesCell letter="R" amount={blackRemis} />, <InterGamesCell letter="L" amount={blackLosses} />],
    ]

    function getLastFiveClasses(match) {
        const classes = []
        const winnerClass = match.winner ? 'winner' : 'loser'
        classes.push((match.winner === 'remis') ? 'remis' : winnerClass)
        classes.push((match.color))
        return classes.join(' ')
    }

    return (
        <ExpansionPanel className="opponent-details">
            <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls={`userDetails_${opponent.name}`}
            >

                <span className="opponentName">
                    { opponent.name }
                    <small>
                        #
                        { Math.round(opponent.ranking) }
                    </small>
                </span>
                <div className="history">
                    { lastFive.map((match) => <span className={getLastFiveClasses(match)}><FaChessKnight size="25" /></span>)}
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                id={`userDetails_${opponent.name}`}
            >

                <div className="half-container">
                    <Table data={tableData} />
                </div>
                <div className="half-container" />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

OpponentDetails.propTypes = {
    opponent: PlayerPropType.isRequired,
    wins: PropTypes.number.isRequired,
    remis: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    whiteWins: PropTypes.number.isRequired,
    whiteRemis: PropTypes.number.isRequired,
    whiteLosses: PropTypes.number.isRequired,
    blackWins: PropTypes.number.isRequired,
    blackRemis: PropTypes.number.isRequired,
    blackLosses: PropTypes.number.isRequired,
    lastFive: PropTypes.arrayOf(MatchPropType),
}

OpponentDetails.defaultProps = {
    lastFive: [],
}

function mapState(state, ownProps) {
    const { selfName, opponent } = ownProps
    const opponentName = opponent.name
    const matches = _.filter(state.matches.matches,
        (match) => (match.white.key === selfName || match.black.key === selfName)
        && (match.white.key === opponentName || match.black.key === opponentName))

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
        if (match.white.key === selfName) {
            let winner
            if (match.winner === 'remis') winner = 'remis'
            else if (match.winner === 'white') winner = true
            return { color: 'white', winner }
        }
        if (match.black.key === selfName) {
            let winner
            if (match.winner === 'remis') winner = 'remis'
            else if (match.winner === 'black') winner = true
            return { color: 'black', winner }
        }
        return undefined
    }).reverse()

    return {
        opponent,
        lastFive,
        whiteWins,
        whiteRemis,
        whiteLosses,
        blackWins,
        blackRemis,
        blackLosses,
        wins,
        remis,
        losses,
    }
}

export default connect(mapState)(OpponentDetails)
