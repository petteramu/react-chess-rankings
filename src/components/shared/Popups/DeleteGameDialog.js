import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import { hideDeleteMatchPopup } from '../../../store/ui/actions'
import { deleteGame } from '../../../store/actions'
import { connect } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

function AddGameDialog(props) {
    const { getAccessTokenSilently } = useAuth0()
    let token = null;
    useEffect(() => {
        async function getToken() {
            token = await getAccessTokenSilently()
        }
        getToken()
    })

    const { match, open, close, submit } = props
    const [sure, setSure] = useState(false)
    if(!match) return null

    const toggleSure = () => setSure(!sure)
    const handleSubmit = () => {
        submit(match.id, token)
        close()
    }
    const checkboxStyle = {
        'marginRight': 'auto',
        'marginLeft': 0
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle component="legend">Delete game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>Are you sure you want to delete:</p>
                    <p style={{"text-transform": "capitalize"}}>{match.white.key} vs. {match.black.key}</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <FormControlLabel
                    style={checkboxStyle}
                    label="I am sure"
                    control={
                        <Checkbox
                            checked={sure}
                            onChange={toggleSure}
                        />}
                />
                <Button onClick={close}>Cancel</Button>
                <Button disabled={!sure} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapState(state) {
    return {
        match: state.ui.deleteGameData,
        open: state.ui.deleteGameVisible
    }
}

function mapDispatch(dispatch) {
    return {
        close: () => dispatch(hideDeleteMatchPopup()),
        submit: (matchId, token) => dispatch(deleteGame(matchId, token))
    }
}

AddGameDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    match: PropTypes.shape({
        white: PropTypes.shape({
            key: PropTypes.string
        }),
        black: PropTypes.shape({
            key: PropTypes.string
        }),
        id: PropTypes.string
    })
}

export default connect(mapState, mapDispatch)(AddGameDialog)