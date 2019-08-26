import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, TextField, DialogActions, Button, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { hideAddPlayerPopup } from '../../../store/ui/actions';
import { connect } from 'react-redux';
import { addPlayer } from '../../../store/actions';

function AddPlayerDialog(props) {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)

    function submit(e) {
        props.onSubmit(name)
        props.onClose()
    }

    function handleChange(e) {
        const value = e.target.value
        const nameTaken = props.takenNames.indexOf(value.toLowerCase()) > -1
        if(nameTaken) {
            return setError("Name already taken")
        }
        setError(false)
        setName(value)
    }

    return (
        <Dialog  open={props.open} onClose={props.onClose}>
            <DialogTitle component="legend">Add player</DialogTitle>
            <DialogContent>
                <DialogContentText>{ error }</DialogContentText>
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
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={submit} disabled={error}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapDispatch(dispatch) {
    return {
        onClose: () => dispatch(hideAddPlayerPopup()),
        onSubmit: (name) => dispatch(addPlayer(name))
    }
}

function mapState(state) {
    return {
        takenNames: state.players.players.map(player => player.name.toLowerCase())
    }
}

AddPlayerDialog.propTypes = {
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    takenNames: PropTypes.array
}

export default connect(mapState, mapDispatch)(AddPlayerDialog)