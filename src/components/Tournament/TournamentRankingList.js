import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RankingTable from '../shared/RankingList/RankingTable'
import './TournamentRankingList.scss'

const mapStateToProps = (state) => {
    const players = _.clone(state.tournament.details.players)

    players.sort((a, b) => {
        if (a.points > b.points) return -1
        if (a.points < b.points) return 1
        return 0
    })

    const playerData = players.map((player, index) => {
        const arr = []
        arr.push({ id: '#', value: `${index + 1}.` })
        arr.push({ id: 'Name', value: player.name })
        arr.push({ id: 'W', value: player.wins })
        arr.push({ id: 'R', value: player.remis })
        arr.push({ id: 'L', value: player.losses })
        arr.push({ id: 'Points', value: player.points })
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
    const headerData = ['#', 'Name', 'W', 'R', 'L', 'Points']
    return (
        <div className="tournament-ranking-list-component">
            <RankingTable headerData={headerData} data={data} />
        </div>
    )
}

RankingListComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
    })),
}

RankingListComponent.defaultProps = {
    data: [],
}

export default connect(mapStateToProps)(RankingListComponent)
