import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { setUserMatchHistoryFilter } from '../../store/ui/actions'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import './UserMatchHistory.scss'
import { PlayerPropType, MatchPropType } from '../../utils/propTypes'

const mapStateToProps = (state, ownProps) => {
    const { matches = [] } = ownProps
    const filter = state.ui.userMatchFilter
    const filteredMatches = (filter)
        ? matches.filter((match) => match.white.key === filter || match.black.key === filter)
        : matches
    return {
        matches: filteredMatches,
        isFetching: state.matches.isFetching || state.players.isFetching,
        pageNumber: state.matches.pageNumber,
        players: state.players.players,
    }
}

const mapDispatchToProps = (dispatch) => ({
    onFilterChanged: (val) => dispatch(setUserMatchHistoryFilter(val)),
})

function UserMatchHistory(props) {
    const {
        players,
        onFilterChanged,
        isFetching,
        matches,
        dispatchShowDeleteMatchPopup,
    } = props
    const [filter, setFilter] = useState('All')
    const handleFilterChange = (e) => {
        const { value } = e.target
        setFilter(value)
        onFilterChanged(value === 'All' ? '' : value)
    }

    const playerItems = players.map((player) => (
        <MenuItem
            key={player.name}
            value={player.name}
            style={{ 'text-transform': 'capitalize' }}
        >
            { player.name }
        </MenuItem>
    ))
    playerItems.unshift(<MenuItem value="All">All</MenuItem>)

    return (
        <div className="match-history-component">
            <div className="match-history-header">
                <h2>Latest maches</h2>
                <div>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        { playerItems }
                    </Select>
                </div>
            </div>
            <div className="user-match-history-container">
                <MatchHistory
                    isFetching={isFetching}
                    matches={matches}
                    dispatchShowDeleteMatchPopup={dispatchShowDeleteMatchPopup}
                />
            </div>
        </div>
    )
}

UserMatchHistory.propTypes = {
    onFilterChanged: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PlayerPropType).isRequired,
    isFetching: PropTypes.bool.isRequired,
    matches: PropTypes.arrayOf(MatchPropType).isRequired,
    dispatchShowDeleteMatchPopup: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMatchHistory)
