import React from 'react'

var monthNames = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MatchScoreComponent(props) {
    let { score, timestamp } = props
    let date = new Date(timestamp)
    let hours = date.getHours()
    hours = (hours > 9) ? hours : `0${hours}`
    let minutes = date.getMinutes()
    minutes = (minutes > 9) ? minutes : `0${minutes}`
    let dateString = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes}`
    return (
        <div className="match-score-component">
            <div className="match-score-container">
                <span className="match-score-points">{score[0]} - {score[1]}</span>
                <span>{ dateString }</span>
            </div>
        </div>
    )
}

export default MatchScoreComponent