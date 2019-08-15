import React from 'react'
import { connect } from 'react-redux'
import MatchHistory from './MatchHistory'
import './MatchHistoryComponent.scss'
const mapStateToProps = (state) => {
    return {
        matches: state.matches.matches,
        isFetching: state.matches.isFetching
    }
}

function MatchHistoryComponent(props) {
    return (
        <div className="match-history-component">
            <h1>Latest maches</h1>
            <MatchHistory {...props}></MatchHistory>
        </div>
    )
}

export default connect(mapStateToProps)(MatchHistoryComponent)