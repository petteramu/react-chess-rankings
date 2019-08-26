import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, Radio, RadioGroup, FormControlLabel, withStyles } from '@material-ui/core';
import { submitTournamentGame } from '../../../store/tournaments/actions';
import { connect } from 'react-redux';
import { hideAddTournamentGamePopup } from '../../../store/ui/actions';

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
    const { match, close, submit, open, classes } = props
    if(!match) return null

    function handleSubmit() {
        const result = {
            winner,
            white: match.white.key,
            black: match.black.key,
            id: match.id
        }

        if(submit) {
            submit(result)
            close()
        }
    }

    function handleChange(e) {
        setWinner(e.target.value)
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle
                component="legend"
                id="AddTournamentGameTitle">Add tournament result</DialogTitle>
            <DialogContent component="section">
                <FormControl
                    component="fieldset"
                    aria-labelledby="AddTournamentGameTitle">
                    <RadioGroup
                        aria-label="Winner"
                        name="winner"
                        value={winner}
                        onChange={handleChange}
                        className={classes.root}>
                        <FormControlLabel
                            value="white"
                            control={<Radio />}
                            label={match.white.key}
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="remis"
                            control={<Radio />}
                            label="Remis"
                            labelPlacement="top"
                        /><FormControlLabel
                            value="black"
                            control={<Radio />}
                            label={match.black.key}
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapState(state) {
    return {
        match: state.ui.addTournamentGameData,
        open: state.ui.addTournamentGameVisible
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
    })
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AddTournamentGameDialog))