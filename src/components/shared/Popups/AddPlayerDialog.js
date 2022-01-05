import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Dialog, TextField, DialogActions, Button, DialogTitle, DialogContent, DialogContentText,
} from '@material-ui/core'
import { hideAddPlayerPopup } from '../../../store/ui/actions'
import { addPlayer } from '../../../store/actions'

function AddPlayerDialog(props) {
    const {
        open, onSubmit, onClose, takenNames,
    } = props
    const [name, setName] = useState('')
    const [error, setError] = useState(false)

    function submit() {
        onSubmit(name)
        onClose()
    }

    function handleChange(e) {
        const { value } = e.target
        const nameTaken = takenNames.indexOf(value.toLowerCase()) > -1
        if (nameTaken) {
            setError('Name already taken')
        } else {
            setError(false)
            setName(value)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle component="legend">Add player</DialogTitle>
            <DialogContent>
                { error && <DialogContentText>{ error }</DialogContentText> }
                <TextField
                    error={error}
                    id="PlayerName"
                    label="Name"
                    margin="normal"
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={submit} disabled={error}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapDispatch(dispatch) {
    return {
        onClose: () => dispatch(hideAddPlayerPopup()),
        onSubmit: (name) => dispatch(addPlayer(name)),
    }
}

function mapState(state) {
    return {
        open: state.ui.addPlayerVisible,
        takenNames: state.players.players.map((player) => player.name.toLowerCase()),
    }
}

AddPlayerDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    takenNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    open: PropTypes.bool.isRequired,
}

export default connect(mapState, mapDispatch)(AddPlayerDialog)
