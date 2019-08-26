import React from 'react'
import { connect } from 'react-redux'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import './HomeMatchHistory.scss'

const mapStateToProps = (state) => {
    return {
        matches: state.matches.matches,
        isFetching: state.matches.isFetching,
        pageNumber: state.matches.pageNumber
    }
}

class HomeMatchHistory extends React.Component {
    render () {
        const props = this.props
        return (
            <div className="match-history-component">
                <MatchHistory {...props}></MatchHistory>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeMatchHistory)