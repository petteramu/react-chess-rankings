import React from 'react'
import { connect } from 'react-redux'
import { submitGame } from '../../../store/actions'
import { hideAddGamePopup } from '../../../store/ui/actions'
import PlayerSelector from '../PlayerSelector/PlayerSelector'
import Popup from './Popup'
import SubmitButton from '../Buttons/SubmitButton'
import './AddGamePopup.scss'

class AddGamePopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { white: undefined, black: undefined, winner: undefined }
        this.setWhite = this.setWhite.bind(this)
        this.setBlack = this.setBlack.bind(this)
        this.close = this.close.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    close() {
        this.props.close()
    }

    setWhite(players) {
        this.setState({ white: players[0] })
    }

    setBlack(players) {
        this.setState({ black: players[0] })
    }

    setWinner(winner) {
        this.setState({ winner })
    }

    onClick() {
        if(typeof this.props.onSubmit === "function") {
            const white = (this.state.white) ? this.state.white.name : ''
            const black = (this.state.black) ? this.state.black.name : ''
            const winner = this.state.winner
            this.props.onSubmit({ white, black, winner })
            this.props.close()
        }
    }

    render() {
        const players = this.props.players
        const white = (this.state.white) ? this.state.white.name : ''
        const black = (this.state.black && this.state.white !== this.state.black) ? this.state.black.name : ''
        const winner = this.state.winner
        return (
            <Popup onCloseClicked={ this.close }>
                <div class="add-game-popup">
                    <h1>Add Game</h1>
                    <div className="playerSelectorContainer">
                        <div><PlayerSelector maxSelected="1" players={players} onSelectionChanged={this.setWhite}/></div>
                        <div><PlayerSelector maxSelected="1" players={players} onSelectionChanged={this.setBlack}/></div>
                    </div>
                    <div className="winnerContainer">
                        <div className={`inline-button ${(winner === 'white') ? 'active' : ''}`} onClick={this.setWinner.bind(this, 'white')}>White</div>
                        <div className={`inline-button ${(winner === 'remis') ? 'active' : ''}`} onClick={this.setWinner.bind(this, 'remis')}>Remis</div>
                        <div className={`inline-button ${(winner === 'black') ? 'active' : ''}`} onClick={this.setWinner.bind(this, 'black')}>Black</div>
                    </div>
                    <SubmitButton onClick={this.onClick} disabled={(white && black && winner) ? false : true}>
                        Submit
                    </SubmitButton>
                </div>
            </Popup>
        )
    }
}

function mapState(state) {
    return {
        players: state.players.players
    }
}

function mapDispatch(dispatch) {
    return {
        onSubmit: (game) => dispatch(submitGame(game)),
        close: () => dispatch(hideAddGamePopup())
    }
}

export default connect(mapState, mapDispatch)(AddGamePopup)