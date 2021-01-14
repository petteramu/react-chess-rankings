import React, { useState, useEffect } from 'react'
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
    FormControl,
    withStyles,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { hideUpdateTournamentMatchPopup } from '../../../store/ui/actions'
import { submitTournamentGame } from '../../../store/tournaments/actions'
import WinnerSelectBox from '../WinnerSelectBox/WinnerSelectBox'
import './UpdateTournamentGame.scss'
import { useAuth0 } from '@auth0/auth0-react'

const styles = () => ({
    checkbox: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    radioGroup: {
        justifyContent: 'space-evenly',
    },
    radioParent: {
        width: '100%',
    },
})

function UpdateTournamentGame(props) {
    const {
        match,
        open,
        close, submit,
        classes,
        fullScreen,
    } = props
    const [sure, setSure] = useState(false)
    const [winner, setWinner] = useState(null)

    const { getAccessTokenSilently } = useAuth0()
    let token = null;
    useEffect(() => {
        async function getToken() {
            token = await getAccessTokenSilently()
        }
        getToken()
    })

    if (!match) return null

    const handleWinnerChanged = (val) => setWinner(val)
    const toggleSure = () => setSure(!sure)
    const handleSubmit = () => {
        const matchObj = {
            white: match.white.key,
            black: match.black.key,
            id: match.id,
            winner,
        }
        submit(matchObj, token)
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullScreen={fullScreen}
            id="UpdateTournamentGameDialog"
        >
            <DialogTitle component="legend">Update result</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p style={{ 'text-transform': 'capitalize' }}>
                        {match.white.key}
                        {' '}
                        vs.
                        {' '}
                        {match.black.key}
                    </p>
                    <p>
                        <strong>
                            This will remove the previous result,
                            and update the rankings to match the new result.
                        </strong>
                    </p>
                </DialogContentText>
                <FormControl component="fieldset" className={classes.radioParent}>
                    <div className="select-winner-container">
                        <WinnerSelectBox
                            type="white"
                            label={match.white.key}
                            active={winner === 'white'}
                            onClick={handleWinnerChanged}
                        />
                        <WinnerSelectBox
                            type="remis"
                            active={winner === 'remis'}
                            onClick={handleWinnerChanged}
                        />
                        <WinnerSelectBox
                            type="black"
                            label={match.black.key}
                            active={winner === 'black'}
                            onClick={handleWinnerChanged}
                        />
                    </div>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <FormControlLabel
                    className={classes.checkbox}
                    label="I am sure"
                    control={(
                        <Checkbox
                            checked={sure}
                            onChange={toggleSure}
                        />
                    )}
                />
                <Button onClick={close}>Cancel</Button>
                <Button disabled={!sure || winner === null} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapState(state) {
    return {
        match: state.ui.updateTournamentGameData,
        open: state.ui.updateTournamentGameVisible,
    }
}

function mapDispatch(dispatch) {
    return {
        close: () => dispatch(hideUpdateTournamentMatchPopup()),
        submit: (match, token) => dispatch(submitTournamentGame(match, token)),
    }
}

UpdateTournamentGame.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    classes: PropTypes.object,
    match: PropTypes.shape({
        white: PropTypes.shape({
            key: PropTypes.string,
        }),
        black: PropTypes.shape({
            key: PropTypes.string,
        }),
        id: PropTypes.string,
    }).isRequired,
    fullScreen: PropTypes.bool,
}

UpdateTournamentGame.defaultProps = {
    fullScreen: true,
}

export default connect(mapState, mapDispatch)(withStyles(styles)(UpdateTournamentGame))
