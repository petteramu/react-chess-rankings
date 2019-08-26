import React from 'react'
import { connect } from 'react-redux'
import { setUserMatchHistoryFilter } from '../../store/ui/actions'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import './UserMatchHistory.scss'

const mapStateToProps = (state, ownProps) => {
    let { matches = [] } = ownProps
    let filter = state.ui.userMatchFilter
    let filteredMatches = (filter) ? matches.filter((match) => match.white.key === filter || match.black.key === filter ) : matches
    return {
        matches: filteredMatches,
        isFetching: state.matches.isFetching || state.players.isFetching,
        pageNumber: state.matches.pageNumber,
        players: state.players.players
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterChanged: (event) => dispatch(setUserMatchHistoryFilter(event.target.value)),
        dispatch
    }
}

class UserMatchHistory extends React.Component {
    render () {
        let { players, ...other } = this.props
        players = [<option value=''>All</option>].concat(players.map((player) => <option key={player.name} value={player.name}>{ player.name }</option>))
        return (
            <div className="match-history-component">
                <div className="match-history-header">
                    <h1>Latest maches</h1>
                    <div>
                        <select onChange={this.props.onFilterChanged}>
                            { players }
                        </select>
                    </div>
                </div>
                <MatchHistory {...other}></MatchHistory>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMatchHistory)