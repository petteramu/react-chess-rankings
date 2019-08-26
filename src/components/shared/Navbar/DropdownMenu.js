import React from 'react'
import { Link } from 'react-router-dom'
import './DropdownMenu.scss'
import { hideMobileMenu } from '../../../store/ui/actions';
import { connect } from 'react-redux';

const keyCodes = {
    UP: 38,
    DOWN: 40,
    ENTER: 0
}

class DropdownItem extends React.Component  {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidUpdate() {
        if(this.props.active) {
            this.ref.current.focus()
        }
    }

    render() {
        const { active, linkTo, text, onKeyPress, onBlur } = this.props
        const tabIndex = (active) ? "0" : "-1"
        return (
            <Link
                innerRef={this.ref}
                className="dropdown-item"
                tabIndex={tabIndex}
                onKeyDown={onKeyPress}
                onBlur={onBlur}
                onClick={this.props.onClick}
                to={linkTo}>
                    {text}
            </Link>
        )
    }
}

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedIndex: undefined }
        this.ref = React.createRef()
        this.onKeyPress = this.onKeyPress.bind(this)
        this.blurMenu = this.blurMenu.bind(this)
    }

    blurMenu(e) {
        let target = e.target
        if(this.ref.current.contains(target) && this.state.selectedIndex !== undefined) return
        if(target.tabIndex !== 0) return
        this.ref.current.removeAttribute("aria-expanded")
        this.setState({ selectedIndex: undefined })
    }

    onKeyPress(e) {
        var currentIndex
        let target = e.target
        switch(e.keyCode) {
            case keyCodes.ENTER:
                if(document.activeElement !== this.ref.current) return
                target.setAttribute("aria-expanded", "true")
                this.setState({ selectedIndex: 0 })
                return
            case keyCodes.DOWN:
                currentIndex = this.state.selectedIndex
                this.setState({ selectedIndex: currentIndex + 1})
                return
            case keyCodes.UP:
                currentIndex = this.state.selectedIndex
                this.setState({ selectedIndex: currentIndex - 1})
                return
            default:
                return
        }   
    }

    render() {
        const { text, id, children } = this.props
        const containerId = `${id}__dropdown_container`
        const { selectedIndex } = this.state

        return (
            <li className="dropdown-menu-listItem">
                <div
                    className="dropdown-toggler"
                    tabIndex="0"
                    aria-haspopup="true"
                    aria-controls={containerId}
                    ref={this.ref}
                    onKeyPress={ this.onKeyPress }>{text}</div>

                <div
                    className="dropdown-container"
                    id={containerId}
                    onKeyPress={this.onKeyPress}>
                        { children.map((child, index) =>  {
                            return <DropdownItem key={index} onKeyPress={this.onKeyPress} onBlur={this.blurMenu} active={index === selectedIndex} {...child}/>
                        })}
                </div>
            </li>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        hideMobileMenu: () => dispatch(hideMobileMenu())
    }
}

export default connect(null, mapDispatch)(DropdownMenu)