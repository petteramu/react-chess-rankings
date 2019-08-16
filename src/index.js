import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { fetchMatches, fetchPlayers } from './store/actions'
import { HashRouter } from 'react-router-dom/cjs/react-router-dom';
import { fetchTournaments } from './store/tournaments/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
store.dispatch(fetchMatches())
store.dispatch(fetchPlayers())
store.dispatch(fetchTournaments())
ReactDOM.render(<HashRouter><Provider store={store}><App /></Provider></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();