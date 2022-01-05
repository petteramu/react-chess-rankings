import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PlayerSelector.scss'
import { PlayerPropType } from '../../../utils/propTypes'

function PlayerEntry(props) {
    const { name, selected, onClick } = props
    const classes = `player-entry ${(selected) ? 'selected' : ''}`

    function onKeyDown(evt) {
        if (evt.keyCode === 13 && onClick) { // Enter key
            onClick()
        }
    }

    return (
        <div role="button" onKeyDown={onKeyDown} tabIndex="0" onClick={onClick} className={classes}>{ name }</div>
    )
}

function PlayerSelector(props) {
    const { onSelectionChanged, maxSelected } = props
    const [selected, setSelected] = useState([])

    function onPlayerSelected(player) {
        const index = selected.indexOf(player)
        const nonNaNMaxSelected = (Number.isNaN(parseInt(maxSelected, 10)))
            ? 0
            : parseInt(maxSelected, 10)

        if (index > -1) {
            selected.splice(index, 1)
            setSelected(selected.concat())
        } else {
            if (nonNaNMaxSelected > 0 && selected.length === nonNaNMaxSelected) {
                selected.pop()
            }
            selected.push(player)
            setSelected(selected.concat())
        }

        if (typeof onSelectionChanged === 'function') { onSelectionChanged(selected) }
    }

    const { players } = props
    return (
        <div className="player-selector">
            { players.map((player) => (
                <PlayerEntry
                    onClick={() => onPlayerSelected(player)}
                    key={player.name}
                    name={player.name}
                    selected={selected.indexOf(player) > -1}
                />
            ))}
        </div>
    )
}

PlayerSelector.propTypes = {
    maxSelected: PropTypes.number,
    players: PropTypes.arrayOf(PlayerPropType).isRequired,
    onSelectionChanged: PropTypes.func.isRequired,
}

PlayerSelector.defaultProps = {
    maxSelected: 0,
}

PlayerEntry.propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

PlayerEntry.defaultProps = {
    onClick: null,
}

export default PlayerSelector
export { PlayerEntry }
