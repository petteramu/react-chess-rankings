import React from 'react'
import MatchResult from '../MatchResult/MatchResult'
import './MatchHistory.scss'
import { nextPage, previousPage } from '../../../store/actions'
import { showDeleteMatchPopup } from '../../../store/ui/actions'
import { connect } from 'react-redux';
import { withAuth0 } from '@auth0/auth0-react';

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

    render () {
        const isFetching = this.props.isFetching
        if(isFetching && !this.props.matches.length) return <h2>Loading...</h2>
        const page = this.props.matches.map((data) => {
            return <MatchResult onClick={this.props.showDeleteMatchPopup.bind(this, data)} style={{opacity: isFetching ? 0.5 : 1}} key={data.id} match={data} />
        })
        
        return (
                <ul ref={this.listRef} className="match-history" >
                    { page }
                </ul>
            )
    }
}

function mapDispatch(dispatch) {
    return {
        showDeleteMatchPopup: (match) => dispatch(showDeleteMatchPopup(match))
    }
}

export default connect(null, mapDispatch)(withAuth0(MatchHistory))