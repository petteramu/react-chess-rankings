import React from 'react'
import HomeRankingListComponent from './HomeRankingTable'
import HomeMatchHistory from './HomeMatchHistory'
import './Home.scss'

const Home = function() {
    return (
        <div id="Home">
            <HomeRankingListComponent></HomeRankingListComponent>
            <HomeMatchHistory></HomeMatchHistory>
        </div>
    )
}

export default Home