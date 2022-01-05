import React from 'react'
import { connect } from 'react-redux'
import './NavBar.scss'
import { Link } from 'react-router-dom'
import { IoMdMenu } from 'react-icons/io'
import PropTypes from 'prop-types'
import {
    showAddPlayerPopup, showAddGamePopup, showMobileMenu, hideMobileMenu,
    showAddTournamentPopup,
} from '../../../store/ui/actions'

import DropdownMenu from './DropdownMenu'

function NavBar(props) {
    const {
        latestTournamentId,
        mobileMenuVisible,
        dispatchHideMobileMenu,
        dispatchShowMobileMenu,
        onAddGame,
        onAddPlayer,
        onAddTournament,
    } = props

    function onMenuClicked() {
        if (mobileMenuVisible) dispatchHideMobileMenu()
        else dispatchShowMobileMenu()
    }

    function getMenuClickHandler(fn) {
        return () => {
            if (typeof fn === 'function') fn()
            dispatchHideMobileMenu()
        }
    }

    const rootTournamentLink = (latestTournamentId) ? `${process.env.PUBLIC_URL}/tournament/${latestTournamentId}` : `${process.env.PUBLIC_URL}/tournament`
    const menuListClass = mobileMenuVisible ? 'visible-mobile' : 'hidden-mobile'
    const backgroundFadeClass = mobileMenuVisible ? 'menu-fade visible' : 'menu-fade'
    const menus = [{
        id: 'update',
        text: 'Update',
        subMenus: [
            { linkTo: '#', text: 'Add game', onClick: getMenuClickHandler(onAddGame) },
            { linkTo: '#', text: 'Add player', onClick: getMenuClickHandler(onAddPlayer) },
        ],
    },
    {
        id: 'tournament',
        text: 'Tournament',
        subMenus: [
            { linkTo: rootTournamentLink, text: 'Latest', onClick: getMenuClickHandler() },
            { linkTo: `${process.env.PUBLIC_URL}/tournament`, text: 'List', onClick: getMenuClickHandler() },
            { linkTo: '#', text: 'Create', onClick: getMenuClickHandler(onAddTournament) },
        ],
    }]
    return (
        <>
            <div
                className={backgroundFadeClass}
                role="button"
                tabIndex="0"
                aria-label="close menu"
                onClick={dispatchHideMobileMenu}
                onKeyDown={dispatchHideMobileMenu}
            />
            <nav className="main-navbar">
                <div className="container">
                    <Link className="logo" to={`${process.env.PUBLIC_URL}/`}>Brisen & Blunder</Link>
                    <div className="mobile-expander">
                        <IoMdMenu onClick={onMenuClicked} size="25" />
                    </div>
                    <ul className={menuListClass}>
                        { menus.map((item) => (
                            <DropdownMenu
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                subMenus={item.subMenus}
                            />
                        )) }
                    </ul>
                </div>
            </nav>
        </>
    )
}

function mapDispatch(dispatch) {
    return {
        onAddPlayer: () => dispatch(showAddPlayerPopup()),
        onAddGame: () => dispatch(showAddGamePopup()),
        onAddTournament: () => dispatch(showAddTournamentPopup()),
        dispatchShowMobileMenu: () => dispatch(showMobileMenu()),
        dispatchHideMobileMenu: () => dispatch(hideMobileMenu()),
    }
}

function mapState(state) {
    const tournaments = (state.tournament && state.tournament.tournaments)
        ? state.tournament.tournaments
        : []
    let latest
    tournaments.forEach((tournament) => {
        if (latest === undefined || tournament.created > latest.created) { latest = tournament }
    })

    return {
        latestTournamentId: (latest) ? latest.id : null,
        mobileMenuVisible: state.ui.mobileMenuVisible,
    }
}

NavBar.propTypes = {
    latestTournamentId: PropTypes.string,
    mobileMenuVisible: PropTypes.bool.isRequired,
    dispatchShowMobileMenu: PropTypes.func.isRequired,
    dispatchHideMobileMenu: PropTypes.func.isRequired,
    onAddGame: PropTypes.func.isRequired,
    onAddPlayer: PropTypes.func.isRequired,
    onAddTournament: PropTypes.func.isRequired,
}

NavBar.defaultProps = {
    latestTournamentId: '',
}

export default connect(mapState, mapDispatch)(NavBar)
