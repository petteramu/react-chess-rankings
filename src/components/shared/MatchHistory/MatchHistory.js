import React from 'react'
import MatchResult from './MatchResult'
import MatchHistoryButton from './MatchHistoryButton'
import './MatchHistory.scss'
import { nextPage, previousPage } from '../../../store/actions'

class MatchHistory extends React.Component {
    constructor (props) {
        super(props)
        this.state = { listPos: undefined }
        this.listRef = React.createRef()
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
    }

    nextPage () {
        const { dispatch } = this.props
        dispatch(nextPage())
    }

    previousPage () {
        const { dispatch } = this.props
        dispatch(previousPage())
    }

    componentDidUpdate () {
        this.setHeight()
    }

    componentDidMount () {
        this.setHeight()
    }

    setHeight() {
        if(this.state.listPos !== undefined || !this.listRef.current) return
        let position = this.listRef.current.getBoundingClientRect()
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let height = Math.max(500, window.innerHeight - (position.top + scrollTop) - 15)
        this.setState({ listPos: height })
    }

    render () {
        const isFetching = this.props.isFetching
        if(isFetching) return <h2>Loading...</h2>

        const page = this.props.matches.map((data) => <MatchResult style={`opacity: ${isFetching ? 0.5 : 1}`} key={data.id} match={data}></MatchResult>)
        return (
                <ul ref={this.listRef} className="match-history" style={{height: this.state.listPos + "px"}}>
                    { page }
                </ul>
            )
    }
}

export default MatchHistory