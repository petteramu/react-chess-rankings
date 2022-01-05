import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './DropdownMenu.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { hideMobileMenu } from '../../../store/ui/actions'
import { KEY_CODES } from '../../../utils'

function DropdownItem(props) {
    const ref = useRef(null)
    const {
        active,
        linkTo,
        text,
        onKeyDown,
        onBlur,
        onClick,
    } = props

    useEffect(() => {
        if (active) {
            ref.current.focus()
        }
    })

    const tabIndex = (active) ? '0' : '-1'
    return (
        <Link
            innerRef={ref}
            className="dropdown-item"
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            to={linkTo}
        >
            {text}
        </Link>
    )
}

function DropdownMenu(props) {
    const [selectedIndex, setSelectedIndex] = useState(undefined)
    const ref = useRef(null)
    const { text, id, subMenus } = props

    function blurMenu(e) {
        const { target } = e
        if (ref.current.contains(target) && selectedIndex !== undefined) return
        if (target.tabIndex !== 0) return
        ref.current.removeAttribute('aria-expanded')
        setSelectedIndex(undefined)
    }

    function onKeyDown(e) {
        let currentIndex
        const { target } = e
        switch (e.keyCode) {
            case KEY_CODES.RIGHT:
                if (document.activeElement !== ref.current) break
                target.setAttribute('aria-expanded', 'true')
                setSelectedIndex(0)
                break
            case KEY_CODES.LEFT:
                blurMenu(e)
                ref.current.focus()
                break
            case KEY_CODES.DOWN:
                currentIndex = selectedIndex
                setSelectedIndex(currentIndex + 1)
                break
            case KEY_CODES.UP:
                currentIndex = selectedIndex
                setSelectedIndex(currentIndex - 1)
                break
            default:
                break
        }
    }

    const containerId = `${id}__dropdown_container`

    return (
        <li className="dropdown-menu-listItem">
            <div
                className="dropdown-toggler"
                tabIndex="0"
                role="button"
                aria-haspopup="true"
                aria-controls={containerId}
                ref={ref}
                onKeyDown={onKeyDown}
            >
                {text}
            </div>

            <div
                className="dropdown-container"
                id={containerId}
            >
                { subMenus.map((child, index) => (
                    <DropdownItem
                        key={child.linkTo + child.text}
                        onKeyDown={onKeyDown}
                        onBlur={blurMenu}
                        active={index === selectedIndex}
                        linkTo={child.linkTo}
                        text={child.text}
                        onClick={child.onClick}
                    />
                ))}
            </div>
        </li>
    )
}

function mapDispatch(dispatch) {
    return {
        hideMobileMenu: () => dispatch(hideMobileMenu()),
    }
}

DropdownItem.propTypes = {
    active: PropTypes.bool,
    linkTo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
}

DropdownItem.defaultProps = {
    active: false,
}

DropdownMenu.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    subMenus: PropTypes.arrayOf(PropTypes.shape({
        linkTo: PropTypes.string,
        text: PropTypes.string,
        onClick: PropTypes.func,
    })),
}

DropdownMenu.defaultProps = {
    subMenus: null,
}

export default connect(null, mapDispatch)(DropdownMenu)
