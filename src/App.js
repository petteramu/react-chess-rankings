import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import './App.scss';
import NavBar from './components/shared/NavBar'
import Home from './components/Home/Home'
import AddPlayerPopup from './components/shared/Popups/AddPlayerPopup';
import AddGamePopup from './components/shared/Popups/AddGamePopup';
import AddTournamentPopup from './components/shared/Popups/AddTournamentPopup'
import User from './components/User/User'
import Tournament from './components/Tournament/Tournament'

function App(props) {
  const { showAddPlayerPopup, showAddGamePopup, showAddTournamentPopup } = props
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
        { (showAddPlayerPopup || showAddGamePopup || showAddTournamentPopup) && <div className="background-fade"></div> }
        { showAddPlayerPopup && <AddPlayerPopup />}
        { showAddGamePopup && <AddGamePopup />}
        { showAddTournamentPopup && <AddTournamentPopup />}
      </main>
    </div>
  )
}

function mapState(state) {
  return {
    showAddPlayerPopup: state.ui.addPlayerVisible,
    showAddGamePopup: state.ui.addGameVisible,
    showAddTournamentPopup: state.ui.addTournamentVisible
  }
}

export default connect(mapState)(App)
