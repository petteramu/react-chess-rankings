import React from 'react'
import PropTypes from 'prop-types'
import { FormHelperText } from '@material-ui/core';

function TournamentInformation(props) {
    const { participants, matchesVsEach } = props
    const rounds = (participants.length - 1) * matchesVsEach
    const matchesPerRound = Math.floor(participants.length / 2)
    return (
        <>
            <FormHelperText>
                Rounds: { rounds }
            </FormHelperText>
            <FormHelperText>
                Matches: { matchesPerRound * rounds }
            </FormHelperText>
        </>
    )
}

TournamentInformation.propTypes = {
    participants: PropTypes.array,
    matchesVsEach: PropTypes.number
}

export default TournamentInformation