import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './Tournament.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TournamentDetails from './TournamentDetails'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen'
import { MatchPropType, TournamentType } from '../../utils/propTypes'

function TournamentItem(props) {
    const { id, created, tournamentName } = props
    const createdDate = new Date(created)
    const hours = (createdDate.getHours() < 10) ? `0${createdDate.getHours()}` : createdDate.getHours()
    const minutes = (createdDate.getMinutes() < 10) ? `0${createdDate.getMinutes()}` : createdDate.getMinutes()
    const readableDate = `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()} ${hours}:${minutes}`
    return (
        <Link className="tournamentLink" key={id} to={`${process.env.PUBLIC_URL}/tournament/${id}`}>
            <strong>{tournamentName}</strong>
            <div className="tournamentLink-created">
                { readableDate }
            </div>
        </Link>
    )
}

function Tournament(props) {
    const { isFetching, match } = props
    let { tournaments } = props
    const tournamentId = (match && match.params) ? match.params.id : null
    if (isFetching) return <LoadingScreen />
    tournaments = _.sortBy(tournaments, 'created').reverse()
    return (
        <div id="tournament">
            { tournamentId && <TournamentDetails tournamentId={tournamentId} />}
            { !tournamentId
                && (
                    <>
                        <h1>Tournaments</h1>
                        <div className="tournament-list">
                            { tournaments.map((tournament) => (
                                <TournamentItem
                                    key={tournament.id}
                                    id={tournament.id}
                                    created={tournament.created}
                                    tournamentName={tournament.tournamentName}
                                />
                            ))}
                        </div>
                    </>
                )}
        </div>
    )
}

function mapState(state) {
    return {
        isFetching: state.tournament.ui,
        tournaments: state.tournament.tournaments,
    }
}

TournamentItem.propTypes = {
    id: PropTypes.string.isRequired,
    created: PropTypes.number,
    tournamentName: PropTypes.string,
}

TournamentItem.defaultProps = {
    created: null,
    tournamentName: '',
}

Tournament.propTypes = {
    isFetching: PropTypes.bool,
    match: MatchPropType.isRequired,
    tournaments: PropTypes.arrayOf(TournamentType),
}

Tournament.defaultProps = {
    tournaments: [],
    isFetching: false,
}

export default connect(mapState)(Tournament)
