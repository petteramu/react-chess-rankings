import React from 'react'

function MatchHistoryButton(props) {
    return (
        <li onClick={props.onClick}className="match-history-button">
            { props.children }
        </li>
    )
}

export default MatchHistoryButton