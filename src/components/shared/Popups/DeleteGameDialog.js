import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { hideDeleteMatchPopup } from '../../../store/ui/actions'
import { deleteGame } from '../../../store/actions'

function DeleteGameDialog(props) {
    const {
        match, open, close, submit,
    } = props
    const [sure, setSure] = useState(false)

    useEffect(() => {
        setSure(false)
    }, [open])

    if (!match) return null

    const toggleSure = () => setSure(!sure)
    const handleSubmit = () => {
        submit(match.id)
        close()
    }
    const checkboxStyle = {
        marginRight: 'auto',
        marginLeft: 0,
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle component="legend">Delete game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete:
                </DialogContentText>
                <DialogContentText>
                    <span style={{ textTransform: 'capitalize' }}>
                        {match.white.key}
                        {' '}
                        vs.
                        {' '}
                        {match.black.key}
                    </span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <FormControlLabel
                    style={checkboxStyle}
                    label="I am sure"
                    control={(
                        <Checkbox
                            checked={sure}
                            onChange={toggleSure}
                        />
                    )}
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
        open: state.ui.deleteGameVisible,
    }
}

function mapDispatch(dispatch) {
    return {
        close: () => dispatch(hideDeleteMatchPopup()),
        submit: (matchId) => dispatch(deleteGame(matchId)),
    }
}

DeleteGameDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    match: PropTypes.shape({
        white: PropTypes.shape({
            key: PropTypes.string,
        }),
        black: PropTypes.shape({
            key: PropTypes.string,
        }),
        id: PropTypes.string,
    }),
}

DeleteGameDialog.defaultProps = {
    match: null,
}

export default connect(mapState, mapDispatch)(DeleteGameDialog)
