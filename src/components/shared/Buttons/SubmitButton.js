import React from 'react'
import './SubmitButton.scss'

function SubmitButton(props) {
    let { children, disabled, ...other } = props
    disabled = (disabled === undefined) ? false : disabled
    return (
        <button disabled={disabled} {...other} className="submit-button">{ props.children }</button>
    )
}

export default SubmitButton