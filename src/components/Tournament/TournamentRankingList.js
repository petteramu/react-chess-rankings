import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import RankingTable from '../shared/RankingList/RankingTable'
import './TournamentRankingList.scss'

const mapStateToProps = (state) => {
    let players = _.clone(state.tournament.details.players)

    players.sort((a, b) => { 
        if (a.points > b.points) return -1
        if (a.points < b.points) return 1
        return 0
    })

    const playerData = players.map((player, index) => {
        let arr = []
        arr.push(index + 1 + '.')
        arr.push(player.name)
        arr.push(player.wins)
        arr.push(player.remis)
        arr.push(player.losses)
        arr.push(player.points)
        return {
            link: `${process.env.PUBLIC_URL}/user/${player.name}`,
            data: arr
        }
    })

    return {
        data: playerData,
        isFetching: state.players.isFetching
    }
}

class RankingListComponent extends React.Component {
    render () {
        const headerData = ['#', 'Name', 'W', 'R', 'L', 'Points']
        return (
            <div className="tournament-ranking-list-component">
                <RankingTable headerData={headerData} {...this.props}></RankingTable>
            </div>
        )
    }
}

export default connect(mapStateToProps)(RankingListComponent)