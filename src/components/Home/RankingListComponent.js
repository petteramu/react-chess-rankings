import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import RankingTable from '../shared/RankingList/RankingTable'
import './RankingListComponent.scss'

const mapStateToProps = (state) => {
    let players = _.clone(state.players.players)
    players.sort((a, b) => { 
        if (a.ranking > b.ranking) return -1
        if (a.ranking < b.ranking) return 1
        return 0
    })

    const playerData = players.map((player, index) => {
        let arr = []
        arr.push(index + 1 + '.')
        arr.push(Math.round(player.ranking))
        arr.push(player.name)
        arr.push(player.streak)
        arr.push(player.wins)
        arr.push(player.remis)
        arr.push(player.losses)
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
        const headerData = ['#', 'MMR', 'Name', 'Streak', 'W', 'R', 'L']
        return (
            <div className="ranking-list-component">
                <RankingTable headerData={headerData} {...this.props}></RankingTable>
            </div>
        )
    }
}

export default connect(mapStateToProps)(RankingListComponent)