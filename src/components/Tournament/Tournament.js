import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './Tournament.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TournamentDetails from './TournamentDetails'
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen'

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
                        { tournaments.map((tournament) => <TournamentItem {...tournament} />)}
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

Tournament.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    match: PropTypes.string.isRequired,
}

export default connect(mapState)(Tournament)
