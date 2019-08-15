import React from 'react'
import { connect } from 'react-redux'
import Popup from './Popup'
import { addPlayer } from '../../../store/actions'
import { hideAddPlayerPopup } from '../../../store/ui/actions'
import SubmitButton from '../Buttons/SubmitButton'
import './AddPlayerPopup.scss'

class AddPlayerPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '' }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.close = this.close.bind(this)
    }

    handleChange(event) {
        this.setState({ name: event.target.value })
    }

    onSubmit() {
        this.props.dispatch(addPlayer(this.state.name))
        this.close()
    }

    close() {
        this.props.dispatch(hideAddPlayerPopup())
    }

    render() {
        return (
            <Popup onCloseClicked={ this.close }>
                <div class="add-player-popup">
                    <h1>Add player</h1>
                    <input type="text" placeholder="Name" value={ this.state.name } onChange={ this.handleChange } />
                    <SubmitButton disabled={!this.state.name} onClick={ this.onSubmit }>Submit</SubmitButton>
                </div>
            </Popup>
        )
    }
}

export default connect()(AddPlayerPopup)