import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import './App.scss';
import NavBar from './components/shared/Navbar/NavBar'
import Home from './components/Home/Home'
import AddPlayerPopup from './components/shared/Popups/AddPlayerPopup';
import AddGamePopup from './components/shared/Popups/AddGamePopup';
import AddTournamentPopup from './components/shared/Popups/AddTournamentPopup'
import User from './components/User/User'
import Tournament from './components/Tournament/Tournament'
import AddTournamentGamePopup from './components/shared/Popups/AddTournamentGamePopup'
import DeleteGamePopup from './components/shared/Popups/DeleteGamePopup';

function App(props) {
  const { showAddPlayerPopup, showAddGamePopup, showAddTournamentPopup, showAddTournamentGamePopup, showDeleteMatchPopup } = props
  const popupVisible = showAddPlayerPopup || showAddGamePopup || showAddTournamentPopup || showAddTournamentGamePopup || showDeleteMatchPopup
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
        { popupVisible && <div className="background-fade"></div> }
        { showAddPlayerPopup && <AddPlayerPopup />}
        { showAddGamePopup && <AddGamePopup />}
        { showAddTournamentPopup && <AddTournamentPopup />}
        { showAddTournamentGamePopup && <AddTournamentGamePopup />}
        { showDeleteMatchPopup && <DeleteGamePopup />}
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

export default connect(mapState)(App)
