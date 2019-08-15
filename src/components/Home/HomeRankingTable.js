import { connect } from 'react-redux'
import RankingListComponent from './RankingListComponent'
const mapStateToProps = (state) => { return { players: state.players } }

export default connect(mapStateToProps)(RankingListComponent)