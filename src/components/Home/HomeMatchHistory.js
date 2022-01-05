import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import './HomeMatchHistory.scss'

const mapStateToProps = (state) => ({
    matches: state.matches.matches,
    isFetching: state.matches.isFetching,
    pageNumber: state.matches.pageNumber,
})

function HomeMatchHistory(props) {
    const { matches, isFetching, pageNumber } = props
    return (
        <div className="match-history-component">
            <MatchHistory matches={matches} isFetching={isFetching} pageNumber={pageNumber} />
        </div>
    )
}

HomeMatchHistory.propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    pageNumber: PropTypes.number,
}

HomeMatchHistory.defaultProps = {
    matches: [],
    isFetching: false,
    pageNumber: 1,
}

export default connect(mapStateToProps)(HomeMatchHistory)
