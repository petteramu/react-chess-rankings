import React from 'react'
import Popup from './Popup'
import { hideAddTournamentGamePopup } from '../../../store/ui/actions'
import { submitTournamentGame } from '../../../store/tournaments/actions';
import { connect } from 'react-redux'
import InlineButton from '../Buttons/InlineButton'
import SubmitButton from '../Buttons/SubmitButton'
import './AddTournamentGamePopup.scss'

class AddTournamentGamePopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { winner: undefined }
        this.onCloseClicked = this.onCloseClicked.bind(this)
        this.onSubmitClicked = this.onSubmitClicked.bind(this)
    }

    onCloseClicked () {
        this.props.close()
    }

    onChange(winner) {
        this.setState({ winner })
    }

    onSubmitClicked() {
        const match = {
            winner: this.state.winner,
            white: this.props.match.white.key,
            black: this.props.match.black.key,
            id: this.props.match.id
        }
        this.props.submit(match)
    }

    render() {
        const white = this.props.match.white.key
        const black = this.props.match.black.key
        return (
            <Popup onCloseClicked={this.onCloseClicked}>
                <div id="TournamentGamePopup">
                    <h1>Add result</h1>
                    <div class="winnerContainer">
                        <InlineButton active={this.state.winner === 'white'} onClick={this.onChange.bind(this, 'white')}>{white}</InlineButton>
                        <InlineButton active={this.state.winner === 'remis'} onClick={this.onChange.bind(this, 'remis')}>Remis</InlineButton>
                        <InlineButton active={this.state.winner === 'black'} onClick={this.onChange.bind(this, 'black')}>{black}</InlineButton>
                    </div>
                    <SubmitButton onClick={this.onSubmitClicked}>Submit</SubmitButton>
                </div>
            </Popup>
        )
    }
}

function mapState(state) {
    return {
        match: state.ui.addTournamentGameData
    }
}

function mapDispatch(dispatch)  {
    return {
        close: () => dispatch(hideAddTournamentGamePopup()),
        submit: (match) => {
            dispatch(submitTournamentGame(match))
            dispatch(hideAddTournamentGamePopup())
        }
    }
}

export default connect(mapState, mapDispatch)(AddTournamentGamePopup)