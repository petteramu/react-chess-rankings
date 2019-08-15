import React from 'react'
import { connect } from 'react-redux'
import { setUserMatchHistoryFilter } from '../../store/actions'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import { MATCHES_PER_PAGE } from '../../configs'
import './UserMatchHistory.scss'

function sliceMatches(pageNumber, matches) {
    if(pageNumber === undefined || !matches) return []
    let maxIndex = matches.length - MATCHES_PER_PAGE
    let currentIndex = Math.min(maxIndex, MATCHES_PER_PAGE * pageNumber)
    currentIndex = Math.max(0, MATCHES_PER_PAGE * pageNumber)
    return matches.slice(currentIndex, currentIndex + MATCHES_PER_PAGE)
}

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
        players = [<option value=''>All</option>].concat(players.map((player) => <option value={player.name}>{ player.name }</option>))
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