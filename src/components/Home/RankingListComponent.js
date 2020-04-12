import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import RankingTable from '../shared/RankingList/RankingTable'
import './RankingListComponent.scss'
import { FaBurn, FaFireAlt, FaPhoenixFramework, FaPoo, FaPooStorm, FaDumpsterFire } from 'react-icons/fa';

const mapStateToProps = (state) => {
    const players = _.clone(state.players.players)
    players.sort((a, b) => { 
        if (a.ranking > b.ranking) return -1
        if (a.ranking < b.ranking) return 1
        return 0
    })

    const playerData = players.map((player, index) => {
        const arr = []
        arr.push(index + 1 + '.')
        arr.push(Math.round(player.ranking))
        arr.push(player.name)
        arr.push(getStreakContent(player.streak)) // POO STORM in font-awesome
        arr.push(player.wins)
        arr.push(player.remis)
        arr.push(player.losses)
        arr.push(`${player.wins}/${player.remis || 0}/${player.losses}`)
        return {
            link: `${process.env.PUBLIC_URL}/user/${player.name}`,
            data: arr,
        }
    })

    return {
        data: playerData,
        isFetching: state.players.isFetching
    }
}

function getStreakContent(streak) {
    let icon = null;
    if (streak >= 3 && streak < 5) {
        return (
            <div className="streak streak--fire">
                <div className="streak__content">{streak}</div>
                <FaBurn />
            </div>
        )
    }
    else if (streak >= 5 && streak < 8) {
        return (
            <div className="streak streak--big-fire">
                <div className="streak__content">{streak}</div>
                <FaFireAlt />
            </div>
        )
    }
    else if (streak >= 8) {
        return (
            <div className="streak streak--phoenix">
                <div className="streak__content">{streak}</div>
                <FaPhoenixFramework />
            </div>
        )
    }
    else if (streak <= -3 && streak > -5) {
        return (
            <div className="streak streak--poo">
                <div className="streak__content">{streak}</div>
                <FaPoo />
            </div>
        )
    }
    else if (streak <= -5 && streak > -8) {
        return (
            <div className="streak streak--poo-storm">
                <div className="streak__content">{streak}</div>
                <FaPooStorm />
            </div>
        )
    }
    else if (streak <= -8) {
        return (
            <div className="streak streak--dumpster">
                <div className="streak__content">{streak}</div>
                <FaDumpsterFire />
            </div>
        )
    }
    return <span className="streak">{streak}</span>
}

class RankingListComponent extends React.Component {
    render () {
        const headerData = ['#', 'MMR', 'Name', 'Streak', 'W', 'R', 'L', 'W/R/L']
        return (
            <div className="ranking-list-component">
                <RankingTable headerData={headerData} {...this.props}></RankingTable>
            </div>
        )
    }
}

export default connect(mapStateToProps)(RankingListComponent)