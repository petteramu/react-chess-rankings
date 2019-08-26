import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogActions, FormHelperText, FormGroup, RadioGroup, Button, DialogContent, FormLabel, TextField, FormControlLabel, useMediaQuery, useTheme, withStyles, Radio } from '@material-ui/core';
import PlayerSelector from '../PlayerSelector/PlayerSelector';
import TournamentInformation from './TournamentInformation'
import { connect } from 'react-redux';
import { hideAddTournamentPopup } from '../../../store/ui/actions';
import { createTournament } from '../../../store/tournaments/actions';

const styles = theme => {
    return {
        dialogContent: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '1em'
        },
        nameLabel: {
            marginLeft: 0,
            marginTop: '1em',
            alignItems: 'start'
        },
        radioGroup: {
            justifyContent: 'space-around'
        },
        margins: {
            margin: '.75em 0 .75em 0'
        }
    }
}

function AddTournamentDialog(props) {
    const { open, submit, close, classes, players } = props
    const [name, setName] = useState(new Date().toDateString())
    const handleNameChange = (e) => setName(e.target.value || new Date().toDateString())
    const [double, setDouble] = useState("single")
    const [participants, setParticipants] = useState([])
    const handleDoubleChange = (e) => setDouble(e.target.value)
    const handleSubmit = () => {
        submit({
            name,
            participants,
            double: double === "double"
        })
        close()
    }

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    
    const tournamentInformation = (participants.length) ? 
        <TournamentInformation
            participants={participants}
            matchesVsEach={double === "double" ? 2 : 1}/> : null

    return (
        <Dialog open={open} fullScreen={fullScreen}>
            <DialogTitle component="legend">Create tournament</DialogTitle>
            <DialogContent
                className={classes.dialogContent}>
                <PlayerSelector
                    players={players}
                    onSelectionChanged={setParticipants}
                />
                <FormGroup>
                    <FormLabel>Tournament name</FormLabel>
                    <TextField
                        className={classes.margins}
                        id="tournamentName"
                        placeholder={name}
                        onChange={handleNameChange}
                    />
                    <FormLabel className={classes.margins}>Single/Double rounds</FormLabel>
                    <RadioGroup
                        name="double"
                        value={double}
                        aria-label="tournament type"
                        onChange={handleDoubleChange}
                        row
                        className={classes.radioGroup}>
                            <FormControlLabel
                                label="Single"
                                labelPlacement="top"
                                value="single"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label="Double"
                                labelPlacement="top"
                                value="double"
                                control={<Radio />}
                            />
                    </RadioGroup>
                    { tournamentInformation }
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button disabled={participants.length < 2} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapState(state) {
    return {
        open: state.ui.addTournamentVisible,
        players: state.players.players
    }
}

function mapDispatch(dispatch) {
    return {
        close: () => dispatch(hideAddTournamentPopup()),
        submit: (data) => dispatch(createTournament(data))
    }
}

AddTournamentDialog.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object,
    players: PropTypes.array,
    close: PropTypes.func,
    submit: PropTypes.func
}

export default connect(mapState, mapDispatch)(withStyles(styles)(AddTournamentDialog))