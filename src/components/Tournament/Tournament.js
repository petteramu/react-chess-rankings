import React from 'react'
import _ from 'lodash'
import './Tournament.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TournamentDetails from './TournamentDetails'

function TournamentItem(props) {
    const { id, created, tournamentName } = props
    let createdDate = new Date(created)
    let hours = (createdDate.getHours() < 10) ? '0' + createdDate.getHours() : createdDate.getHours()
    let minutes = (createdDate.getMinutes() < 10) ? '0' + createdDate.getMinutes() : createdDate.getMinutes()
    let readableDate = `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()} ${hours}:${minutes}`
    return (
        <Link className="tournamentLink" key={id} to={`${process.env.PUBLIC_URL}/tournament/${id}`}>
            <strong>{tournamentName}</strong>
            <div class="tournamentLink-created">
                { readableDate }
            </div>
        </Link>
    )
}

class Tournament extends React.Component {
    render() {
        let { isFetching, match, tournaments } = this.props
        const tournamentId = (match && match.params) ? match.params.id : null
        if(isFetching) return <div id="tournament"><h1>Loading...</h1></div>
        tournaments = _.sortBy(tournaments, 'created').reverse()
        return (
            <div id="tournament">
                { tournamentId && <TournamentDetails tournamentId={tournamentId}></TournamentDetails>}
                { !tournamentId && 
                    <>
                        <h1>Tournaments</h1>
                        <div className="tournament-list">
                            { tournaments.map(tournament =>
                                <TournamentItem {...tournament} />
                            )}
                        </div>
                    </>
                }
            </div>
        )
    }
}

function mapState(state) {
    return {
        isFetching: state.tournament.ui,
        tournaments: state.tournament.tournaments
    }
}

export default connect(mapState)(Tournament)