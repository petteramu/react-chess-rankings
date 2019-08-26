import React from 'react';
import { connect } from 'react-redux'
import './NavBar.scss'
import { showAddPlayerPopup, showAddGamePopup, showMobileMenu, hideMobileMenu } from '../../../store/ui/actions'
import { showAddTournamentPopup } from '../../../store/ui/actions'
import { Link } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'
import { IoMdMenu } from 'react-icons/io'

class NavBar extends React.Component {

    onMenuClicked() {
        this.props.mobileMenuVisible ? this.props.hideMobileMenu() : this.props.showMobileMenu()
    }

    getMenuClickHandler(fn) {
        return () => {
            if(typeof fn === "function") fn()
            this.props.hideMobileMenu()
        }
    }

    render () {
        let rootTournamentLink = (this.props.latestTournamentId) ? `/tournament/${this.props.latestTournamentId}` : '/tournament'
        let menuListClass = this.props.mobileMenuVisible ? 'visible-mobile' : 'hidden-mobile'
        let backgroundFadeClass = this.props.mobileMenuVisible ? 'menu-fade visible' : 'menu-fade'
        const { onAddGame, onAddPlayer, onAddTournament } = this.props
        let menus = [{
                id: "update",
                text: "Update",
                children: [
                    { linkTo: "#", text: "Add game", onClick: this.getMenuClickHandler(onAddGame)},
                    { linkTo: "#", text: "Add player", onClick: this.getMenuClickHandler(onAddPlayer)}
                ]
            },
            {
                id: "tournament",
                text: "Tournament",
                children: [
                    { linkTo: rootTournamentLink, text: "Latest", onClick: this.getMenuClickHandler() },
                    { linkTo: "/tournament", text: "List", onClick: this.getMenuClickHandler() },
                    { linkTo: "#", text: "Create", onClick: this.getMenuClickHandler(onAddTournament)}
                ]
            },
        ]
        return (
            <nav className="main-navbar">
                <div className="container">
                    <Link className="logo" to="/">Nf6 & Chill</Link>
                    <div tabIndex="0" className="mobile-expander">
                        <IoMdMenu onClick={ this.onMenuClicked.bind(this) } size="25" />
                    </div>
                    <div className={backgroundFadeClass} onClick={ this.props.hideMobileMenu }></div>
                    <ul className={menuListClass}>
                        { menus.map((menuItem) => <DropdownMenu key={menuItem.id} {...menuItem} />) }
                    </ul>
                </div>
            </nav>
        )
    }
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
        mobileMenuVisible: state.ui.mobileMenuVisible
    }
}

export default connect(mapState, mapDispatch)(NavBar)