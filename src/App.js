import React from 'react'
import { Switch, Route } from 'react-router-dom'
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
import UpdateTournamentGame from './components/shared/Popups/UpdateTournamentGame';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/tournament/:id`} component={Tournament} />
          <Route path={`${process.env.PUBLIC_URL}/tournament/`} component={Tournament} />
          <Route path={`${process.env.PUBLIC_URL}/user/:id`} component={User} />
          <Route path={`${process.env.PUBLIC_URL}/`} component={Home} />
        </Switch>
        <AddPlayerDialog />
        <AddGameDialog />
        <AddTournamentGameDialog />
        <DeleteGameDialog />
        <AddTournamentDialog />
        <UpdateTournamentGame />
      </main>
    </div>
  )
}
export default App
