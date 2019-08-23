import React from 'react'
import Popup from './Popup'
import InlineButton from '../Buttons/InlineButton'
import { deleteGame } from '../../../store/actions';
import { hideDeleteMatchPopup } from '../../../store/ui/actions';
import { connect } from 'react-redux';
import './DeleteGamePopup.scss'

class DeleteGamePopup extends React.Component {
    constructor(props) {
        super(props)
        this.yesRef = React.createRef()
        this.noRef = React.createRef()
    }

    componentDidMount() {
    }

    render() {
        const game = this.props.gameToDelete
        const id = (game) ? game.id : null
        return (
            <Popup onCloseClicked={ this.props.close }>
                <div className="delete-game-popup">
                    <h1>Delete game</h1>
                    <div class="game-info">
                        <p>Are yous you want to delete:</p>
                        <p class="lineup">{ this.props.gameToDelete.white.key } vs. { this.props.gameToDelete.black.key }</p>
                    </div>
                    <InlineButton ref={this.yesRef} onClick={this.props.delete.bind(this, id)}>Yes</InlineButton>
                    <InlineButton ref={this.noRef} onClick={this.props.close.bind(this)}>No</InlineButton>
                </div>
            </Popup>
        )
    }
}

function mapState(state) {
    return {
        gameToDelete: state.ui.deleteGameData
    }
}

function mapDispatch(dispatch) {
    return {
        delete: (id) => dispatch(deleteGame(id)),
        close: () => dispatch(hideDeleteMatchPopup())
    }
}

export default connect(mapState, mapDispatch)(DeleteGamePopup)