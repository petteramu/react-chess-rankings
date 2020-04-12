import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    useMediaQuery,
    useTheme,
} from '@material-ui/core'
import HomeRankingListComponent from './RankingListComponent'
import HomeMatchHistory from './HomeMatchHistory'
import './Home.scss'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen'
import MMRChart from '../shared/Charts/MMRChart'

const Home = function Home(props) {
    const {
        lacksMatches,
        lacksPlayers,
        isFetching,
        players,
    } = props

    const theme = useTheme()
    const disableLegend = useMediaQuery(theme.breakpoints.down('sm'))

    const displayLoadingScreen = (lacksPlayers || lacksMatches) && isFetching
    if (displayLoadingScreen) return <LoadingScreen />

    return (
        <div id="Home">
            <HomeRankingListComponent />
            <HomeMatchHistory />
            <MMRChart players={players} disableLegend={disableLegend} />
        </div>
    )
}

function mapState(state) {
    return {
        lacksPlayers: !state.players.players || state.players.players.length === 0,
        lacksMatches: !state.matches.matches || state.matches.matches.length === 0,
        isFetching: state.players.isFetching || state.matches.isFetching,
        players: state.players.players,
    }
}

Home.propTypes = {
    lacksMatches: PropTypes.bool.isRequired,
    lacksPlayers: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        ranking: PropTypes.number.isRequired,
    })),
}

Home.defaultProps = {
    players: [],
}

export default connect(mapState)(Home)
