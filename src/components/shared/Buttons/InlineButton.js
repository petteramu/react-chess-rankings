import React from 'react'
import './InlineButton.scss'

const InlineButton = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} tabIndex="0" className={`inline-button ${(props.active) ? 'active' : ''}`} onClick={props.onClick}>{props.children}</div>
    )
})

export default InlineButton