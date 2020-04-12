import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUserMatchHistoryFilter } from '../../store/ui/actions'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import './UserMatchHistory.scss'
import { Select, MenuItem } from '@material-ui/core';

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
        onFilterChanged: (val) => dispatch(setUserMatchHistoryFilter(val))
    }
}

function UserMatchHistory(props) {
    const [filter, setFilter] = useState("All")
    const handleFilterChange = (e) => {
        const value = e.target.value
        setFilter(value)
        props.onFilterChanged(value === "All" ? "" : value)
    }
    let { players, ...other } = props
    players = [<MenuItem value="All">All</MenuItem>].concat(players.map((player) =>
        <MenuItem key={player.name} value={player.name} style={{"text-transform": "capitalize"}}>{ player.name }</MenuItem>))

    return (
        <div className="match-history-component">
            <div className="match-history-header">
                <h2>Latest maches</h2>
                <div>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}>
                        { players }
                    </Select>
                </div>
            </div>
            <div className="user-match-history-container">
                <MatchHistory {...other} />
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMatchHistory)