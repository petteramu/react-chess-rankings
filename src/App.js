import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import './App.scss';
import NavBar from './components/shared/NavBar'
import Home from './components/Home/Home'
import AddPlayerPopup from './components/shared/Popups/AddPlayerPopup';
import AddGamePopup from './components/shared/Popups/AddGamePopup';
import User from './components/User/User'

function App(props) {
  const { showAddPlayerPopup, showAddGamePopup } = props
  return (
    <div className="App">
      <NavBar></NavBar>
      <main>
        <Switch>
          <Route path="/user/:id" component={User} />
          <Route path="/" component={Home} />
        </Switch>
        { (showAddPlayerPopup || showAddGamePopup) && <div className="background-fade"></div> }
        { showAddPlayerPopup && <AddPlayerPopup />}
        { showAddGamePopup && <AddGamePopup />}
      </main>
    </div>
  );
}

function mapState(state) {
  return {
    showAddPlayerPopup: state.ui.addPlayerVisible,
    showAddGamePopup: state.ui.addGameVisible
  }
}

export default connect(mapState)(App)
