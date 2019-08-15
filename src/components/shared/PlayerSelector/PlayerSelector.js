import React from 'react'
import './PlayerSelector.scss'

function PlayerEntry(props) {
    const { name, selected, onClick } = props
    const classes = `player-entry ${(selected) ? 'selected' : ''}`
    return (
        <div onClick={onClick} className={classes}>{ name }</div>
    )
}

class PlayerSelector extends React.Component {
    constructor(props) {
        super(props)

        this.state = { selected: [] }
    }

    onPlayerSelected(player) {
        let index = this.state.selected.indexOf(player)
        let { selected } = this.state
        let maxSelected = (isNaN(parseInt(this.props.maxSelected))) ? 0 : parseInt(this.props.maxSelected)
        if(index > -1) {
            selected.splice(index, 1)
            this.setState({ selected: selected.concat() })
        }
        else {
            if(maxSelected > 0 && selected.length === maxSelected) {
                selected.pop()
            }
            selected.push(player)
            this.setState({ selected: selected.concat() })
        }

        if(this.props && typeof this.props.onSelectionChanged === "function")
            this.props.onSelectionChanged(this.state.selected)
    }

    render() {
        const { players } = this.props
        return (
            <div className="player-selector">
                { players.map((player) => {
                    return <PlayerEntry
                        onClick={this.onPlayerSelected.bind(this, player)}
                        key={player.name}
                        name={player.name}
                        selected={this.state.selected.indexOf(player) > -1} />
                    })
                }
            </div>
        )
    }
}

export default PlayerSelector
export { PlayerEntry }