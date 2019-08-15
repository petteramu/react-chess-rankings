import React from 'react';
import { connect } from 'react-redux'
import './NavBar.scss'
import { showAddPlayerPopup, showAddGamePopup } from '../../store/actions';
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
                <li>Tournaments</li>
            </ul>
        </nav>
    }
}

function mapDispatch(dispatch) {
    return {
        onAddPlayer: () => dispatch(showAddPlayerPopup()),
        onAddGame: () => dispatch(showAddGamePopup())
    }
}

export default connect(null, mapDispatch)(NavBar)