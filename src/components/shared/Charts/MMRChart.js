import React, { useState } from 'react'
import _ from 'lodash'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { connect } from 'react-redux'

const red = "#f72c25"
const darkPurple = "#2d1e2f"
const saffron = "#F7B32B"
const bananaMania = "#FCF6B1"
const seaFoamGreen = "#A9E5BB"
const silver = "#bfc0c0"
const wine = "#6b2737"
const vanilla = "#F8F4A6"
const aquaMarine = "#85ffc7"
const onyx = "#39393a"
const colors = [red, darkPurple, saffron, bananaMania, seaFoamGreen, silver, wine, vanilla, aquaMarine, onyx]

const PAGE_SIZE = 10

function MMRChart(props) {
    let { title, data, players, min, max } = props
    let [pageNumber, setPage] = useState(0)
    let page = data.slice(pageNumber * PAGE_SIZE, pageNumber * PAGE_SIZE + PAGE_SIZE)

    let width = window.innerWidth > 1024 ? 1024 : window.innerWidth - 30

    return (
        <div className="MMRChart-container">
            { title && <h2>{title}</h2> }
            <LineChart width={width} height={width * 0.6} margin={{left: -20, right: 0, top: 0, bottom: 0}} data={page}>
                { players.map((player, index) =>
                    <Line type="monotone" key={player.name} dataKey={player.name} stroke={colors[index]} />
                )}
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis domain={[min, max]}/>
                <Legend />
                <Tooltip />
            </LineChart>
        </div>
    )
}

function mapStateToProps(state) {
    const { data, min, max } = getDailyChartData(state.matches.matches)
    const players = state.players.players
    return { data, players, min, max }
}

function getDailyChartData (matches) {
    if(!matches || matches.length === 0) {
        return null
    }
    let min = 1200
    let max = 1200
	let dataArray = _.map(matches, function(match) {
		return {
            name: getDateStamp(match.timestamp)
        }
	})
    dataArray = _.uniqBy(dataArray, 'name').reverse()

	for(let match of matches) {
        let dataObject = _.find(dataArray, (obj) => obj.name === getDateStamp(match.timestamp))

		// Handle both gains and losses for both colors. Must check for gain and loss since remis are unpredictable in who has which.
        if(match.white.change !== undefined) {
            let whiteName = match['white'].key
            let whiteRanking = Math.round(match['white'].preRanking + match['white'].change)
            dataObject[whiteName] = whiteRanking
            if(whiteRanking > max) max = whiteRanking
            if(whiteRanking < min) min = whiteRanking
        }

		if(match.black.change !== undefined) {
            let blackName = match['black'].key
            let blackRanking = Math.round(match['black'].preRanking + match['black'].change)
            dataObject[blackName] = blackRanking
            if(blackRanking > max) max = blackRanking
            if(blackRanking < min) min = blackRanking
        }
	}

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Transform into date
	dataArray.forEach(function(obj) {
		let date = new Date(obj.name)
		obj.name = `${date.getDate()} ${monthNames[date.getMonth()]}`
	})

    fillEmpty(dataArray)

	return { 
        data: dataArray,
        min,
        max
    }
}

function fillEmpty(data) {
    for(let index = 1; index < data.length; index++) {
        let entry = data[index]
        let prevEntry = data[index- 1]
        let keys = Object.keys(prevEntry)
        for(let key of keys) {
            if(entry[key] === undefined)
                entry[key] = prevEntry[key]
        }
    }
}

function getDateStamp (stamp) {
	let date = new Date(stamp)
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	date.setMilliseconds(0)
	return date.getTime()
}

export default connect(mapStateToProps)(MMRChart)