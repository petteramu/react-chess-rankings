import React from 'react';
import { connect } from 'react-redux'
import './NavBar.scss'
import { showAddPlayerPopup, showAddGamePopup } from '../../store/ui/actions'
import { showAddTournamentPopup } from '../../store/ui/actions'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    render () {
        let rootTournamentLink = (this.props.latestTournamentId) ? `/tournament/${this.props.latestTournamentId}` : '/tournament'
        return <nav className="main-navbar">
            <ul>
                <li><Link to="/">Nf6 & Chill</Link></li>
                <li>
                    Update
                    <div className="navbar-expander-container">
                        <div className="navbar-expander-child" onClick={this.props.onAddGame}>Add Game</div>
                        <div className="navbar-expander-child" onClick={this.props.onAddPlayer}>Add Player</div>
                    </div>
                </li>
                <li>
                    <Link to={rootTournamentLink}>Tournaments</Link>
                    <div className="navbar-expander-container">
                    <Link to="/tournament"><div className="navbar-expander-child">List</div></Link>
                        <div className="navbar-expander-child" onClick={this.props.onAddTournament}>Create</div>
                    </div>
                </li>
            </ul>
        </nav>
    }
}

function mapDispatch(dispatch) {
    return {
        onAddPlayer: () => dispatch(showAddPlayerPopup()),
        onAddGame: () => dispatch(showAddGamePopup()),
        onAddTournament: () => dispatch(showAddTournamentPopup())
    }
}

function mapState(state) {
    let tournaments = (state.tournament && state.tournament.tournaments) ? state.tournament.tournaments : []
    let latest = undefined
    tournaments.forEach((tournament) => {
        if(latest === undefined || tournament.created > latest.created)
            latest = tournament
    })

    return {
        latestTournamentId: (latest) ? latest.id : null
    }
}

export default connect(mapState, mapDispatch)(NavBar)