import React from 'react'
import HomeRankingListComponent from './RankingListComponent'
import HomeMatchHistory from './HomeMatchHistory'
import './Home.scss'

const Home = function() {
    return (
        <div id="Home">
            <HomeRankingListComponent />
            <HomeMatchHistory></HomeMatchHistory>
        </div>
    )
}

export default Home