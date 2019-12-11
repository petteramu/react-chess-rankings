import React from 'react'
import HomeRankingListComponent from './RankingListComponent'
import HomeMatchHistory from './HomeMatchHistory'
import './Home.scss'
import { connect } from 'react-redux'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen';
import MMRChart from '../shared/Charts/MMRChart';
import CustomChart from '../shared/Charts/CustomChart';

const Home = function(props) {
    const displayLoadingScreen = (props.lacksPlayers || props.lacksMatches) && props.isFetching
    if(displayLoadingScreen) return <LoadingScreen />
    return (
        <div id="Home">
            <HomeRankingListComponent />
            <HomeMatchHistory></HomeMatchHistory>
            {/* <MMRChart /> */}
            <CustomChart />
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
export default connect(mapState)(Home)