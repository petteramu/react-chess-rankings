import React from 'react'
import './InlineButton.scss'

function InlineButton(props) {
    return (
        <div className={`inline-button ${(props.active) ? 'active' : ''}`} onClick={props.onClick}>{props.children}</div>
    )
}

export default InlineButton