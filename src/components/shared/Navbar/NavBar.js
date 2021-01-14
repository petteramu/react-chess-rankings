import React from 'react'
import { connect } from 'react-redux'
import './NavBar.scss'
import { showAddPlayerPopup, showAddGamePopup, showMobileMenu, hideMobileMenu } from '../../../store/ui/actions'
import { showAddTournamentPopup } from '../../../store/ui/actions'
import { Link } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'
import LoginButton from '../Buttons/LoginButton'
import { IoMdMenu } from 'react-icons/io'
import { useAuth0 } from "@auth0/auth0-react"
import ProfileInfo from '../User/ProfileInfo'

function NavBar(props) {
    function onMenuClicked() {
        props.mobileMenuVisible ? props.hideMobileMenu() : props.showMobileMenu()
    }

    function getMenuClickHandler(fn) {
        return () => {
            if(typeof fn === "function") fn()
            props.hideMobileMenu()
        }
    }

    const { isAuthenticated } = useAuth0();

    let rootTournamentLink = (props.latestTournamentId) ? `${process.env.PUBLIC_URL}/tournament/${props.latestTournamentId}` : `${process.env.PUBLIC_URL}/tournament`
    let menuListClass = props.mobileMenuVisible ? 'visible-mobile' : 'hidden-mobile'
    let backgroundFadeClass = props.mobileMenuVisible ? 'menu-fade visible' : 'menu-fade'
    const { onAddGame, onAddPlayer, onAddTournament, permissions } = props

    let tournamentOptions = [
        { linkTo: rootTournamentLink, text: "Latest", onClick: getMenuClickHandler() },
        { linkTo: `${process.env.PUBLIC_URL}/tournament`, text: "List", onClick: getMenuClickHandler() },
    ]

    if (permissions) {
        const canCreateTournament = permissions.indexOf("add:tournament") >= 0
        if (canCreateTournament) {
            tournamentOptions.push({ linkTo: "#", text: "Create", onClick: getMenuClickHandler(onAddTournament)})
        }
    }

    let menus = [
        {
            id: "tournament",
            text: "Tournament",
            children: tournamentOptions
        }
    ];

    if (permissions) {
        const canAddPlayer = permissions.indexOf("add:user") >= 0
        const canAddGame = permissions.indexOf("add:game") >= 0

        if (canAddGame || canAddPlayer) {
            const updateObject = {
                id: "update",
                text: "Update",
                children: []
            }
            
            if (canAddGame) updateObject.children.push({ linkTo: "#", text: "Add game", onClick: getMenuClickHandler(onAddGame)})
            if (canAddPlayer) updateObject.children.push({ linkTo: "#", text: "Add player", onClick: getMenuClickHandler(onAddPlayer)})

            menus.unshift(updateObject)
        }
    }

    return (
        <>
            <div className={backgroundFadeClass} onClick={ props.hideMobileMenu }></div>
            <nav className="main-navbar">
                <div className="container">
                    <Link className="logo" to={`${process.env.PUBLIC_URL}/`}>Brisen & Blunder</Link>
                    <div tabIndex="0" className="mobile-expander">
                        <IoMdMenu onClick={ onMenuClicked.bind(this) } size="25" />
                    </div>
                    <ul className={menuListClass}>
                        { menus.map((menuItem) => <DropdownMenu key={menuItem.id} {...menuItem} />) }
                        { !isAuthenticated && <li><LoginButton></LoginButton></li> }
                        { isAuthenticated && <li><ProfileInfo></ProfileInfo></li> }
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
        showMobileMenu: () => dispatch(showMobileMenu()),
        hideMobileMenu: () => dispatch(hideMobileMenu())
    }
}

function mapState(state) {
    let tournaments = (state.tournament && state.tournament.tournaments) ? state.tournament.tournaments : []
    let latest = undefined
    tournaments.forEach((tournament) => {
        if(latest === undefined || tournament.created > latest.created)
            latest = tournament
    })
    return {
        latestTournamentId: (latest) ? latest.id : null,
        mobileMenuVisible: state.ui.mobileMenuVisible,
        permissions: state.auth.permissions
    }
}

export default connect(mapState, mapDispatch)(NavBar)