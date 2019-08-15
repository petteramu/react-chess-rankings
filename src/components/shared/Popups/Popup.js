import React from 'react'
import './Popup.scss'
import { IoIosClose } from 'react-icons/io'

class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.onOutsideClicked = this.onOutsideClicked.bind(this)
    }

    componentDidMount() {
        if(this.props.onCloseClicked === undefined) return
        document.addEventListener("mousedown", this.onOutsideClicked)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onOutsideClicked)
    }

    onOutsideClicked (event) {
        if(this.ref && this.ref.current && !this.ref.current.contains(event.target)) {
            this.props.onCloseClicked()
        }
    }

    render() {
        return (
            <div
                ref={this.ref}
                className="popup">
                <div className="closer" onClick={this.props.onCloseClicked}><IoIosClose size={40} /></div>
                { this.props.children }
            </div>
        )
    }
}

export default Popup