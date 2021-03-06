import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createReducers from './store/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { fetchMatchesAndPlayers } from './store/actions'
import { fetchTournaments } from './store/tournaments/actions';
import { createBrowserHistory } from 'history/cjs/history.min';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline'
export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(createReducers(history), composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(history))))
store.dispatch(fetchMatchesAndPlayers())
store.dispatch(fetchTournaments())

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <ConnectedRouter basename={`/sjakk`} history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();