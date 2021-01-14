import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import {
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'
import { hideAddGamePopup } from '../../../store/ui/actions'
import { submitGame } from '../../../store/actions'
import PlayerSelector from '../PlayerSelector/PlayerSelector'
import './AddGameDialog.scss'
import WinnerSelectBox from '../WinnerSelectBox/WinnerSelectBox'
import { useAuth0 } from '@auth0/auth0-react'

function AddGameDialog(props) {
    const { getAccessTokenSilently } = useAuth0()

    const [winner, setWinner] = useState(null)
    const [white, setWhite] = useState(null)
    const [black, setBlack] = useState(null)
    const {
        open,
        onClose,
        onSubmit,
        players,
    } = props

    let token = null;
    useEffect(() => {
        async function getToken() {
            token = await getAccessTokenSilently()
        }
        getToken()
    })

    function handleChange(val) {
        setWinner(val)
    }

    function handleSubmit() {
        onSubmit({ winner, white: white.name, black: black.name }, token)
    }

    function handleWhiteChanged(players) {
        setWhite(players[0])
    }

    function handleBlackChanged(players) {
        setBlack(players[0])
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="add-game-dialog-title">Add game</DialogTitle>
            <DialogContent>
                <div className="player-selector-container">
                    <PlayerSelector maxSelected={1} players={players} onSelectionChanged={handleWhiteChanged}/>
                    <PlayerSelector maxSelected={1} players={players} onSelectionChanged={handleBlackChanged}/>
                </div>
                <div className="select-winner-container">
                    <WinnerSelectBox
                        type="white"
                        label={white ? white.name : null}
                        active={winner === 'white'}
                        onClick={handleChange}
                    />
                    <WinnerSelectBox
                        type="remis"
                        active={winner === 'remis'}
                        onClick={handleChange}
                    />
                    <WinnerSelectBox
                        type="black"
                        label={black ? black.name : null}
                        active={winner === 'black'}
                        onClick={handleChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!winner || !white || !black || black === white}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapState(state) {
    return {
        open: state.ui.addGameVisible,
        players: state.players.players,
    }
}

function mapDispatch(dispatch) {
    return {
        onClose: () => dispatch(hideAddGamePopup()),
        onSubmit: (match, token) => {
            dispatch(hideAddGamePopup())
            dispatch(submitGame(match, token))
        }
    }
}

AddGameDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
}

export default connect(mapState, mapDispatch)(AddGameDialog)
