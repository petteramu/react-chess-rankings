import React from 'react'
import Popup from './Popup'
import { hideAddTournamentPopup } from '../../../store/ui/actions'
import { connect } from 'react-redux';
import PlayerSelector from '../PlayerSelector/PlayerSelector'
import SubmitButton from '../Buttons/SubmitButton'
import './AddTournamentPopup.scss'
import { createTournament } from '../../../store/tournaments/actions';

class AddTournamentPopup extends React.Component {
    constructor(props) {
        super(props)
        this.defaultName = new Date().toDateString()
        this.state = { participants: [], double: false, name: '' }
        this.doubleRef = React.createRef()
        this.nameRef = React.createRef()

        this.onParticipantsChanged = this.onParticipantsChanged.bind(this)
        this.onNameChanged = this.onNameChanged.bind(this)
        this.onDoubleChanged = this.onDoubleChanged.bind(this)
        this.onSubmitClicked = this.onSubmitClicked.bind(this)
    }

    onParticipantsChanged(participants) {
        this.setState({ participants })
    }

    onNameChanged(event) {
        const name = event.target.value
        this.setState({ name })
    }

    onDoubleChanged(event) {
        const double = event.target.checked === true
        this.setState({ double })
    }

    onSubmitClicked() {
        let tournamentObject = Object.assign({}, this.state)
        if(!tournamentObject.name) tournamentObject.name = this.defaultName
        this.props.onSubmit(tournamentObject)
    }

    render () {
        const { players } = this.props
        const submitDisabled = this.state.participants.length < 2
        return (
            <Popup onCloseClicked={this.props.onClose}>
                <div class="add-tournament-popup">
                    <h1>Create Tournament</h1>
                    <div class="split-container">
                        <div class="half-container">
                            <h3>Select participants</h3>
                            <div class="player-selector-scroller">
                                <PlayerSelector onSelectionChanged={this.onParticipantsChanged} players={players} />
                            </div>
                        </div>
                        <div class="half-container">
                            <h3>Options</h3>
                            <div class="options-item">
                                <label for="tournamentName">Tournament name:</label>
                                <input id="tournamentName" type="text" placeholder={this.defaultName} onChange={this.onNameChanged} />
                            </div>
                            <div class="options-item">
                                <label for="doubleOption">Double:</label>
                                <input id="doubleOption" type="checkbox" onClick={this.onDoubleChanged} />
                            </div>
                        </div>
                    </div>
                    <SubmitButton disabled={submitDisabled}onClick={this.onSubmitClicked}>Create Tournament</SubmitButton>
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
        onClose: () => dispatch(hideAddTournamentPopup()),
        onSubmit: (data) => dispatch(createTournament(data))
    }
}

export default connect(mapState, mapDispatch)(AddTournamentPopup)