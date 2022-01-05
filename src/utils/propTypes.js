import PropTypes from 'prop-types'

const PlayerPropType = PropTypes.shape({
    ranking: PropTypes.number.isRequired,
    peak: PropTypes.number,
    name: PropTypes.string,
})

const MatchPropType = PropTypes.shape({
    white: PropTypes.shape({
        key: PropTypes.string.isRequired,
        change: PropTypes.number.isRequired,
        preRanking: PropTypes.number.isRequired,
    }),
    black: PropTypes.shape({
        key: PropTypes.string.isRequired,
        change: PropTypes.number.isRequired,
        preRanking: PropTypes.number.isRequired,
    }),
    winner: PropTypes.string,
    timestamp: PropTypes.number,
    id: PropTypes.string.isRequired,
})

const TournamentType = PropTypes.shape({
    created: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    tournamentName: PropTypes.string,
})

export {
    PlayerPropType,
    MatchPropType,
    TournamentType,
}
