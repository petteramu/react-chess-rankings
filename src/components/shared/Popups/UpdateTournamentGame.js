import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormLabel, Button, Checkbox, FormControlLabel, FormControl, Radio, RadioGroup, withStyles } from '@material-ui/core'
import { hideUpdateTournamentMatchPopup } from '../../../store/ui/actions'
import { connect } from 'react-redux'
import { submitTournamentGame } from '../../../store/tournaments/actions'

const styles = (theme) => {
    return {
        checkbox: {
            'marginRight': 'auto',
            'marginLeft': 0
        },
        radioGroup: {
            justifyContent: 'space-evenly'
        },
        radioParent: {
            width: "100%"
        }
    }
}

function UpdateTournamentGame(props) {
    const { match, open, close, submit, classes } = props
    const [sure, setSure] = useState(false)
    const [winner, setWinner] = useState(null)
    if(!match) return null

    const handleWinnerChanged = (e) => setWinner(e.target.value)
    const toggleSure = () => setSure(!sure)
    const handleSubmit = () => {
        let matchObj = {
            white: match.white.key,
            black: match.black.key,
            id: match.id,
            winner
        }
        submit(matchObj)
        close()
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle component="legend">Update result</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p style={{"text-transform": "capitalize"}}>{match.white.key} vs. {match.black.key}</p>
                    <p><strong>This will remove the previous result, and update the rankings to match the new result.</strong></p>
                </DialogContentText>
                <FormControl component="fieldset" className={classes.radioParent}>
                    <RadioGroup
                        aria-label="Winner"
                        name="winner"
                        value={winner}
                        onChange={handleWinnerChanged}
                        className={classes.radioGroup}
                        row>
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
                <FormControlLabel
                    className={classes.checkbox}
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
        match: state.ui.updateTournamentGameData,
        open: state.ui.updateTournamentGameVisible
    }
}

function mapDispatch(dispatch) {
    return {
        close: () => dispatch(hideUpdateTournamentMatchPopup()),
        submit: (match) => dispatch(submitTournamentGame(match))
    }
}

UpdateTournamentGame.propTypes = {
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

export default connect(mapState, mapDispatch)(withStyles(styles)(UpdateTournamentGame))