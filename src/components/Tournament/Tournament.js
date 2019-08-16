import React from 'react'
import './Tournament.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TournamentDetails from './TournamentDetails'

class Tournament extends React.Component {
    render() {
        const { isFetching, match, tournaments } = this.props
        const tournamentId = (match && match.params) ? match.params.id : null
        if(isFetching) return <div id="tournament"><h1>Loading...</h1></div>
        return (
            <div id="tournament">
                { tournamentId && <TournamentDetails tournamentId={tournamentId}></TournamentDetails>}
                { !tournamentId && 
                    <div>
                        <div>Tournaments</div>
                        { tournaments.map(tournament =>
                            <Link to={`/tournament/${tournament.id}`}>{tournament.tournamentName}</Link>
                        )}
                    </div>
                }
            </div>
        )
    }
}

function mapState(state) {
    return {
        isFetching: state.tournament.ui,
        tournaments: state.tournament.tournaments
    }
}

export default connect(mapState)(Tournament)