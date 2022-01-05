import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MatchResult from '../MatchResult/MatchResult'
import './MatchHistory.scss'
import { showDeleteMatchPopup } from '../../../store/ui/actions'
import { MatchPropType } from '../../../utils/propTypes'

function MatchHistory(props) {
    const { isFetching, matches, dispatchShowDeleteMatchPopup } = props
    if (isFetching && !matches.length) return <h2>Loading...</h2>

    const page = matches.map((data) => (
        <MatchResult
            onClick={dispatchShowDeleteMatchPopup}
            style={{ opacity: isFetching ? 0.5 : 1 }}
            key={data.id}
            match={data}
        />
    ))
    return (
        <ul className="match-history">
            { page }
        </ul>
    )
}

function mapDispatch(dispatch) {
    return {
        dispatchShowDeleteMatchPopup: (match) => dispatch(showDeleteMatchPopup(match)),
    }
}

MatchHistory.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    matches: PropTypes.arrayOf(MatchPropType).isRequired,
    dispatchShowDeleteMatchPopup: PropTypes.func.isRequired,
}

export default connect(null, mapDispatch)(MatchHistory)
