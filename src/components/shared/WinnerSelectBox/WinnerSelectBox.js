import React from 'react'
import PropTypes from 'prop-types'
import { FaChessKnight } from 'react-icons/fa'
import './WinnerSelectBox.scss'

function WinnerSelectBox(props) {
    const {
        label,
        type,
        active,
        onClick,
    } = props

    const labelClasses = `${type}-box`
    const selectWinnerClasses = `select-winner ${type} ${active ? 'active' : null}`

    function handleClick() {
        if (typeof onClick === 'function') {
            onClick(type)
        }
    }

    function onKeyDown() {

    }

    return (
        <div className="select-winner-input">
            { type !== 'remis' && (
                <div onClick={handleClick} onKeyDown={onKeyDown} role="button" tabIndex="0">
                    <label htmlFor={labelClasses}>
                        <span className="label-text">{ label }</span>
                        <div
                            id={labelClasses}
                            className={selectWinnerClasses}
                            role="checkbox"
                            aria-checked={active}
                            tabIndex="0"
                        >
                            <div className="svg-container"><FaChessKnight size="60" /></div>
                        </div>
                    </label>
                </div>
            )}
            { type === 'remis' && (
                <div
                    id="remis-box"
                    className={selectWinnerClasses}
                    onClick={handleClick}
                    onKeyDown={onKeyDown}
                    role="checkbox"
                    aria-checked={active}
                    tabIndex="0"
                >
                    <div className="svg-container">
                        <span className="white">
                            <FaChessKnight size="60" />
                        </span>
                        <span className="black">
                            <FaChessKnight size="60" />
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

WinnerSelectBox.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
}

WinnerSelectBox.defaultProps = {
    label: '',
    active: false,
    onClick: null,
}

export default WinnerSelectBox
