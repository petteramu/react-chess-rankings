import React from 'react'
import _ from 'lodash'
import './User.scss'
import { connect } from 'react-redux';
import Table from '../shared/Table/Table'
import OpponentDetails from './OpponentDetails'
import InterGamesCell from './InterGamesCell'
import UserMatchHistory from './UserMatchHistory'
import { Paper, Typography } from '@material-ui/core';

class User extends React.Component {

    render() {
        const name = this.props.match.params.id
        const { statistics, players, matches } = this.props
        return (
            <section id="User">
                <Typography className="title" type="h2">{ name }</Typography>
                <div className="half-container">
                    <UserStatistics {...statistics} />
                    <h2>Matchups</h2>
                    { players && players.map((opponent) => (opponent.name === name) ? null : <OpponentDetails key={opponent.name} selfName={name} opponent={opponent} />) }
                </div>
                <div className="half-container">
                    <UserMatchHistory matches={matches} />
                </div>
            </section>
        )
    }
}

function UserStatistics(props) {
    let { ranking, peak, wins, remis, losses, whiteWins, whiteRemis, whiteLosses, blackWins, blackRemis, blackLosses } = props
    const totalGames = wins + remis + losses || 0
    const tableData = [
        ['White:', <InterGamesCell letter="W" amount={whiteWins} />, <InterGamesCell letter="R" amount={whiteRemis} />, <InterGamesCell letter="L" amount={whiteLosses} />],
        ['Black:', <InterGamesCell letter="W" amount={blackWins} />, <InterGamesCell letter="R" amount={blackRemis} />, <InterGamesCell letter="L" amount={blackLosses} />],
        ['Total:', <InterGamesCell letter="W" amount={wins} />, <InterGamesCell letter="R" amount={remis} />, <InterGamesCell letter="L" amount={losses} />]
    ]

    return (
        <Paper className="user-statistics">
            <div class="flex-row">
                <span className="statistics-item">
                    <span className="statistics-item-label">Rating:</span>
                    <span className="statistics-item-content">{ Math.round(ranking) }</span>
                </span>
                <span className="statistics-item">
                    <span className="statistics-item-label">Peak:</span>
                    <span className="statistics-item-content">{ Math.round(peak) }</span>
                </span>
                <span className="statistics-item">
                    <span className="statistics-item-label">Games:</span>
                    <span className="statistics-item-content">{ totalGames }</span>
                </span>
            </div>
            <span className="statistics-item">
                <Table data={tableData}/>
            </span>
        </Paper>
    )
}

function mapState(state, ownProps) {
    if(_.has(ownProps, 'match.params.id') && _.has(state, 'players.players')) {
        const id = ownProps.match.params.id
        const player = _.find(state.players.players, (statePlayer) => statePlayer.name === id)
        if(player === undefined) return { isFetching: state.players.isFetching || state.matches.isFetching }

        const matches = _.filter(state.matches.matches, (match) => match.white.key === id || match.black.key === id)

        const whiteMatches = _.filter(matches, (match) => match.white.key === id)
        const whiteWins = _.filter(whiteMatches, (match) => match.winner === 'white').length
        const whiteRemis = _.filter(whiteMatches, (match) => match.winner === 'remis').length
        const whiteLosses = _.filter(whiteMatches, (match) => match.winner === 'black').length

        const blackMatches = _.filter(matches, (match) => match.black.key === id)
        const blackWins = _.filter(blackMatches, (match) => match.winner === 'black').length
        const blackRemis = _.filter(blackMatches, (match) => match.winner === 'remis').length
        const blackLosses = _.filter(blackMatches, (match) => match.winner === 'white').length

        const statistics = {
            whiteWins,
            whiteRemis,
            whiteLosses,
            blackWins,
            blackRemis,
            blackLosses,
            wins: player.wins,
            remis: player.remis,
            losses: player.losses,
            ranking: player.ranking,
            peak: player.peak
        }

        const players = state.players.players

        return { player, matches, players, statistics }
    }
    return {}
}

export default connect(mapState)(User)