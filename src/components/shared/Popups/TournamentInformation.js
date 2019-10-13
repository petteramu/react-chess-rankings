import React from 'react'
import PropTypes from 'prop-types'
import { FormHelperText } from '@material-ui/core';

function TournamentInformation(props) {
    const { participants, matchesVsEach } = props
    const matchesPerPlayer = (participants.length - 1) * matchesVsEach
    const totalMatches = (matchesPerPlayer * participants.length) / 2
    const matchesPerRound = Math.floor(participants.length / 2)
    const rounds = totalMatches / matchesPerRound
    return (
        <>
            <FormHelperText>
                Rounds: { rounds }
            </FormHelperText>
            <FormHelperText>
                Matches: { totalMatches }
            </FormHelperText>
        </>
    )
}

TournamentInformation.propTypes = {
    participants: PropTypes.array,
    matchesVsEach: PropTypes.number
}

export default TournamentInformation