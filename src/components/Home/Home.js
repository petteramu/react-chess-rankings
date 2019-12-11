import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeRankingListComponent from './RankingListComponent'
import HomeMatchHistory from './HomeMatchHistory'
import './Home.scss'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen';
import MMRChart from '../shared/Charts/MMRChart';
import CustomChart from '../shared/Charts/CustomChart';

const Home = function Home(props) {
    const { lacksMatches, lacksPlayers, isFetching } = props
    const displayLoadingScreen = (lacksPlayers || lacksMatches) && isFetching
    if (displayLoadingScreen) return <LoadingScreen />
    return (
        <div id="Home">
            <HomeRankingListComponent />
            <HomeMatchHistory />
            <MMRChart />
            {/* <CustomChart /> */}
        </div>
    )
}

function mapState(state) {
    return {
        lacksPlayers: !state.players.players || state.players.players.length === 0,
        lacksMatches: !state.matches.matches || state.matches.matches.length === 0,
        isFetching: state.players.isFetching || state.matches.isFetching,
    }
}

Home.propTypes = {
    lacksMatches: PropTypes.bool.isRequired,
    lacksPlayers: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
}

export default connect(mapState)(Home)
