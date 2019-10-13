import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, Radio, RadioGroup, FormControlLabel, withStyles } from '@material-ui/core';
import { submitTournamentGame } from '../../../store/tournaments/actions';
import { hideAddTournamentGamePopup } from '../../../store/ui/actions';
import WinnerSelectBox from '../WinnerSelectBox/WinnerSelectBox'
import './AddTournamentGameDialog.scss'

const styles = theme => ({
    root: {
        justifyContent: 'center',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    }
})

function AddTournamentGameDialog(props) {
    const [winner, setWinner] = useState(null)
    const { match, close, submit, open, classes, fullScreen } = props
    if (!match) return null

    function handleSubmit() {
        const result = {
            winner,
            white: match.white.key,
            black: match.black.key,
            id: match.id,
        }

        if (submit) {
            submit(result)
            close()
        }
    }

    function handleChange(val) {
        setWinner(val)
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullScreen={fullScreen}
            id="AddTournamentGameDialog"
        >
            <DialogTitle
                component="legend"
                id="AddTournamentGameTitle"
            >
                Add tournament result
            </DialogTitle>
            <DialogContent component="section">
                <div className="select-winner-container">
                    <WinnerSelectBox
                        type="white"
                        label={match.white.key}
                        active={winner === "white"}
                        onClick={handleChange}
                    />
                    <WinnerSelectBox
                        type="remis"
                        active={winner === "remis"}
                        onClick={handleChange}
                    />
                    <WinnerSelectBox
                        type="black"
                        label={match.black.key}
                        active={winner === "black"}
                        onClick={handleChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={winner === null}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapState(state) {
    return {
        match: state.ui.addTournamentGameData,
        open: state.ui.addTournamentGameVisible,
    }
}

function mapDispatch(dispatch) {
    return {
        close: () => dispatch(hideAddTournamentGamePopup()),
        submit: (match) => dispatch(submitTournamentGame(match))
    }
}

AddTournamentGameDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    classes: PropTypes.object,
    match: PropTypes.shape({
        white: PropTypes.shape({
            key: PropTypes.string
        }),
        black: PropTypes.shape({
            key: PropTypes.string
        }),
        id: PropTypes.string
    }),
    fullScreen: PropTypes.bool,
}

AddTournamentGameDialog.defaultProps = {
    fullScreen: true,
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AddTournamentGameDialog))