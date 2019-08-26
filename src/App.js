import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.scss'
import NavBar from './components/shared/Navbar/NavBar'
import Home from './components/Home/Home'
import AddGameDialog from './components/shared/Popups/AddGameDialog'
import AddPlayerDialog from './components/shared/Popups/AddPlayerDialog'
import AddTournamentGameDialog from './components/shared/Popups/AddTournamentGameDialog'
import AddTournamentDialog from './components/shared/Popups/AddTournamentDialog'
import User from './components/User/User'
import Tournament from './components/Tournament/Tournament'
import DeleteGameDialog from './components/shared/Popups/DeleteGameDialog'

function App(props) {
  const { showAddPlayerPopup, showAddGamePopup, showAddTournamentGamePopup, showDeleteMatchPopup } = props
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route path="/tournament/:id" component={Tournament} />
          <Route path="/tournament/" component={Tournament} />
          <Route path="/user/:id" component={User} />
          <Route path="/" component={Home} />
        </Switch>
        <AddPlayerDialog open={showAddPlayerPopup} />
        <AddGameDialog open={showAddGamePopup} />
        <AddTournamentGameDialog open={showAddTournamentGamePopup} />
        <DeleteGameDialog open={showDeleteMatchPopup} />
        <AddTournamentDialog />
      </main>
    </div>
  )
}

function mapState(state) {
  return {
    showAddPlayerPopup: state.ui.addPlayerVisible,
    showAddGamePopup: state.ui.addGameVisible,
    showAddTournamentPopup: state.ui.addTournamentVisible,
    showAddTournamentGamePopup: state.ui.addTournamentGameVisible,
    showDeleteMatchPopup: state.ui.deleteGameVisible
  }
}

App.propTypes = {
  showAddPlayerPopup: PropTypes.bool,
  showAddGamePopup: PropTypes.bool,
  showAddTournamentPopup: PropTypes.bool,
  showAddTournamentGamePopup: PropTypes.bool,
  showDeleteMatchPopup: PropTypes.bool
}

export default connect(mapState)(App)
