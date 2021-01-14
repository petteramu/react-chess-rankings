import React from "react";
import { Switch, Route } from 'react-router-dom'
import {
    useMediaQuery,
    useTheme,
} from '@material-ui/core'
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from './shared/Navbar/NavBar'
import Home from './Home/Home'
import AddGameDialog from './shared/Popups/AddGameDialog'
import AddPlayerDialog from './shared/Popups/AddPlayerDialog'
import AddTournamentGameDialog from './shared/Popups/AddTournamentGameDialog'
import AddTournamentDialog from './shared/Popups/AddTournamentDialog'
import DeleteGameDialog from './shared/Popups/DeleteGameDialog'
import UpdateTournamentGame from './shared/Popups/UpdateTournamentGame'
import Tournament from "./Tournament/Tournament"
import User from "./User/User"
import { storeJwt } from '../store/actions'
import { connect } from "react-redux";

function AppContent(props) {
    const { storeJwt } = props
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    if (isAuthenticated) {
        getAccessTokenSilently()
        .then((token) => {
            storeJwt(token)
        })
    }

    const theme = useTheme()
    const smallOrDown = useMediaQuery(theme.breakpoints.down('sm'))
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
                { isAuthenticated && <AddPlayerDialog /> }
                { isAuthenticated && <AddGameDialog /> }
                { isAuthenticated && <AddTournamentGameDialog /> }
                { isAuthenticated && <DeleteGameDialog /> }
                { isAuthenticated && <AddTournamentDialog /> }
                { isAuthenticated && <UpdateTournamentGame fullScreen={smallOrDown} /> }
            </main>
        </div>
    );
}

function mapDispatch(dispatch) {
    return {
        storeJwt: (token) => dispatch(storeJwt(token))
    }
}

export default connect(null, mapDispatch)(AppContent)
