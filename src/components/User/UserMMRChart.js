import React, { useState } from 'react'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    MenuItem,
    Checkbox,
    InputLabel,
    Select,
    ListItemText,
} from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md'
import PropTypes from 'prop-types'
import MMRChart from '../shared/Charts/MMRChart'
import './UserMMRChart.scss'

function UserMMRChart(props) {
    const { players, defaultSelected } = props
    const [selectedPlayerNames, setSelectedPlayerNames] = useState(defaultSelected)

    function handleChange(event) {
        const { value } = event.target
        const newValues = []
        for (let i = 0, l = value.length; i < l; i += 1) {
            if (value[i].selected) {
                newValues.push(value[i].newValues)
            }
        }
        setSelectedPlayerNames(value)
    }

    const chartPlayers = selectedPlayerNames.map((name) => ({ name }))

    return (
        <ExpansionPanel id="user-mmr-chart">
            <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="user_graph"
            >
                Graph
            </ExpansionPanelSummary>
            <ExpansionPanelDetails id="user_graph">
                <MMRChart players={chartPlayers} maxHeight={300} />
                <div className="graph-select-container">
                    <InputLabel id="user-graph-select-label">Players</InputLabel>
                    <Select
                        labelId="user-graph-select-label"
                        id="user-graph-select"
                        multiple
                        value={selectedPlayerNames}
                        onChange={handleChange}
                        renderValue={(selected) => (selected.length === 1 ? selected[0] : `${selected.length} players`)}
                    >
                        {players.map((player) => (
                            <MenuItem key={player.name} value={player.name}>
                                <Checkbox checked={selectedPlayerNames.indexOf(player.name) > -1} />
                                <ListItemText primary={player.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

UserMMRChart.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    defaultSelected: PropTypes.arrayOf(PropTypes.string),
}

UserMMRChart.defaultProps = {
    defaultSelected: [],
}

export default UserMMRChart
