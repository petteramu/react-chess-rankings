import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
 Dialog, TextField, DialogActions, Button, DialogTitle, DialogContent, DialogContentText 
} from '@material-ui/core'
import { hideAddPlayerPopup } from '../../../store/ui/actions'
import { addPlayer } from '../../../store/actions'
import { useAuth0 } from '@auth0/auth0-react'

function AddPlayerDialog(props) {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)

    const { getAccessTokenSilently } = useAuth0()
    let token = null;
    useEffect(() => {
        async function getToken() {
            token = await getAccessTokenSilently()
        }
        getToken()
    })

    function submit() {
        props.onSubmit(name, token)
        props.onClose()
    }

    function handleChange(e) {
        const { value } = e.target
        const nameTaken = props.takenNames.indexOf(value.toLowerCase()) > -1
        if (nameTaken) {
            return setError('Name already taken')
        }
        setError(false)
        setName(value)
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
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
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={submit} disabled={error}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapDispatch(dispatch) {
    return {
        onClose: () => dispatch(hideAddPlayerPopup()),
        onSubmit: (name, token) => dispatch(addPlayer(name, token)),
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
    takenNames: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
}

export default connect(mapState, mapDispatch)(AddPlayerDialog)
