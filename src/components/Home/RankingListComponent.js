import React from 'react'
import { connect } from 'react-redux'
import RankingTable from '../shared/RankingList/RankingTable'
import './RankingListComponent.scss'
const mapStateToProps = (state) => {
    return {
        players: state.players.players,
        isFetching: state.players.isFetching
    }
}

class RankingListComponent extends React.Component {
    render () {
        return (
            <div className="ranking-list-component">
                <h1>Rankings</h1>
                <RankingTable {...this.props}></RankingTable>
            </div>
        )
    }
}

export default connect(mapStateToProps)(RankingListComponent)