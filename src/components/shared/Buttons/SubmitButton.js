import React from 'react'
import './SubmitButton.scss'

class SubmitButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = { clicked: false }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({clicked: true})
        if(this.props.onClick) this.props.onClick()
    }

    render() {
        let { children, disabled, onClick, waitingContent, ...other } = this.props
        disabled = (disabled === undefined) ? this.state.clicked : disabled || this.state.clicked
        return (
            <button disabled={disabled} onClick={this.onClick} {...other} className="submit-button">
                { !this.state.clicked && children }
                { this.state.clicked && (waitingContent || "Please wait...") }
            </button>
        )
    }
}

export default SubmitButton