import React from 'react'
import { connect } from 'react-redux'
import MatchHistory from '../shared/MatchHistory/MatchHistory'
import { MATCHES_PER_PAGE } from '../../configs'
import './HomeMatchHistory.scss'

function sliceMatches(pageNumber, matches) {
    let maxIndex = matches.length - MATCHES_PER_PAGE
    let currentIndex = Math.min(maxIndex, MATCHES_PER_PAGE * pageNumber)
    currentIndex = Math.max(0, MATCHES_PER_PAGE * pageNumber)
    return matches.slice(currentIndex, currentIndex + MATCHES_PER_PAGE)
}

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