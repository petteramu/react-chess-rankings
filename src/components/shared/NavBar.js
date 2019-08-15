import React from 'react';
import { connect } from 'react-redux'
import './NavBar.scss'
import { showAddPlayerPopup, showAddGamePopup } from '../../store/ui/actions'
import { showAddTournamentPopup } from '../../store/ui/actions'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    render () {
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
                    Tournaments
                    <div className="navbar-expander-container">
                        <div className="navbar-expander-child">List</div>
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

export default connect(null, mapDispatch)(NavBar)