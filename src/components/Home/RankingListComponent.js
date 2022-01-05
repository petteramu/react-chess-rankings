import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    FaBurn, FaFireAlt, FaPhoenixFramework, FaPoo, FaPooStorm, FaDumpsterFire,
} from 'react-icons/fa'
import RankingTable from '../shared/RankingList/RankingTable'
import './RankingListComponent.scss'

const mapStateToProps = (state) => {
    const players = _.clone(state.players.players)
    players.sort((a, b) => {
        if (a.ranking > b.ranking) return -1
        if (a.ranking < b.ranking) return 1
        return 0
    })

    function getStreakContent(streak) {
        if (streak >= 3 && streak < 5) {
            return (
                <div className="streak streak--fire">
                    <div className="streak__content">{streak}</div>
                    <FaBurn />
                </div>
            )
        }
        if (streak >= 5 && streak < 8) {
            return (
                <div className="streak streak--big-fire">
                    <div className="streak__content">{streak}</div>
                    <FaFireAlt />
                </div>
            )
        }
        if (streak >= 8) {
            return (
                <div className="streak streak--phoenix">
                    <div className="streak__content">{streak}</div>
                    <FaPhoenixFramework />
                </div>
            )
        }
        if (streak <= -3 && streak > -5) {
            return (
                <div className="streak streak--poo">
                    <div className="streak__content">{streak}</div>
                    <FaPoo />
                </div>
            )
        }
        if (streak <= -5 && streak > -8) {
            return (
                <div className="streak streak--poo-storm">
                    <div className="streak__content">{streak}</div>
                    <FaPooStorm />
                </div>
            )
        }
        if (streak <= -8) {
            return (
                <div className="streak streak--dumpster">
                    <div className="streak__content">{streak}</div>
                    <FaDumpsterFire />
                </div>
            )
        }
        return <span className="streak">{streak}</span>
    }

    const playerData = players.map((player, index) => {
        const arr = []
        arr.push({ id: '#', value: `${index + 1}.` })
        arr.push({ id: 'MMR', value: Math.round(player.ranking) })
        arr.push({ id: 'NAME', value: player.name })
        arr.push({ id: 'STREAK', value: getStreakContent(player.streak) }) // POO STORM in font-awesome
        arr.push({ id: 'WINS', value: player.wins })
        arr.push({ id: 'REMIS', value: player.remis })
        arr.push({ id: 'LOSSES', value: player.losses })
        arr.push({ id: 'WRL', value: `${player.wins}/${player.remis || 0}/${player.losses}` })
        return {
            link: `${process.env.PUBLIC_URL}/user/${player.name}`,
            data: arr,
        }
    })

    return {
        data: playerData,
        isFetching: state.players.isFetching,
    }
}

function RankingListComponent(props) {
    const { data } = props
    const headerData = ['#', 'MMR', 'Name', 'Streak', 'W', 'R', 'L', 'W/R/L']
    return (
        <div className="ranking-list-component">
            <RankingTable headerData={headerData} data={data} />
        </div>
    )
}

RankingListComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
        })),
    })).isRequired,
}

export default connect(mapStateToProps)(RankingListComponent)
