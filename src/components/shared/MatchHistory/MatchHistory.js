import React from 'react'
import MatchResult from './MatchResult'
import MatchHistoryButton from './MatchHistoryButton'
import './MatchHistory.scss'
import { nextPage, previousPage } from '../../../store/actions'

class MatchHistory extends React.Component {
    constructor (props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
    }

    nextPage = () => {
        const { dispatch } = this.props
        dispatch(nextPage())
    }

    previousPage = () => {
        const { dispatch } = this.props
        dispatch(previousPage())
    }

    render () {
        const isFetching = this.props.isFetching
        if(isFetching) return <h2>Loading...</h2>

        const page = this.props.matches.map((data) => <MatchResult style={`opacity: ${isFetching ? 0.5 : 1}`} key={data.id} match={data}></MatchResult>)
        return (
                <ul className="match-history">
                    <MatchHistoryButton onClick={this.previousPage}>Previous</MatchHistoryButton>
                    { page }
                    <MatchHistoryButton onClick={this.nextPage}>Next</MatchHistoryButton>
                </ul>
            )
    }
}

export default MatchHistory