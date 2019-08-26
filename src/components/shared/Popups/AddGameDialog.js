import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux';
import { hideAddGamePopup } from '../../../store/ui/actions';
import { DialogContent, DialogActions, Button, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup } from '@material-ui/core';
import { submitGame } from '../../../store/actions'
import PlayerSelector from '../PlayerSelector/PlayerSelector'
import './AddGameDialog.scss'

function AddGameDialog(props) {
    const [winner, setWinner] = useState(null)
    const [white, setWhite] = useState(null)
    const [black, setBlack] = useState(null)
    const { open, onClose, onSubmit, players } = props

    function handleChange(e) {
        setWinner(e.target.value)
    }

    function handleSubmit() {
        onSubmit({ winner, white: white.name, black: black.name })
    }

    function handleWhiteChanged(players) {
        setWhite(players[0])
    }

    function handleBlackChanged(players) {
        setBlack(players[0])
    }

    const radioStyle = {
        justifyContent: 'center',
        width: '100%'
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="add-game-dialog-title">Add game</DialogTitle>
            <DialogContent>
                <div className="player-selector-container">
                    <PlayerSelector maxSelected={1} players={players} onSelectionChanged={handleWhiteChanged}/>
                    <PlayerSelector maxSelected={1} players={players} onSelectionChanged={handleBlackChanged}/>
                </div>
                <FormControl component="fieldset" style={radioStyle}>
                    <FormLabel component="legend">Select Winner</FormLabel>
                    <RadioGroup aria-label="Winner" name="winner" value={winner} onChange={handleChange} row style={radioStyle}>
                        <FormControlLabel
                            value="white"
                            control={<Radio />}
                            label="White"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="remis"
                            control={<Radio />}
                            label="Remis"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="black"
                            control={<Radio />}
                            label="Black"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </FormControl>
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
        addGameVisible: state.ui.addGameVisible,
        players: state.players.players
    }
}

function mapDispatch(dispatch) {
    return {
        onClose: () => dispatch(hideAddGamePopup()),
        onSubmit: (match) => {
            dispatch(hideAddGamePopup())
            dispatch(submitGame(match))
        }
    }
}

AddGameDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired
}

export default connect(mapState, mapDispatch)(AddGameDialog)