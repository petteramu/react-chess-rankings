import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { Button } from '@material-ui/core'
import './MMRChart.scss'

const red = '#f72c25'
const darkPurple = '#2d1e2f'
const saffron = '#F7B32B'
const bananaMania = '#FCF6B1'
const seaFoamGreen = '#A9E5BB'
const silver = '#bfc0c0'
const wine = '#6b2737'
const vanilla = '#F8F4A6'
const aquaMarine = '#85ffc7'
const onyx = '#39393a'
const colors = [red, darkPurple, saffron, bananaMania, seaFoamGreen, silver,
    wine, vanilla, aquaMarine, onyx]

const PAGE_SIZE = 10

function MMRChart(props) {
    const {
        title, data, players, min, max,
    } = props
    const rootEle = React.createRef()
    const [pageNumber, setPage] = useState(0)
    const page = data.slice(pageNumber * PAGE_SIZE, pageNumber * PAGE_SIZE + PAGE_SIZE)
    const [width, setWidth] = useState(0)

    function updateWidth() {
        if (!rootEle.current) return
        setWidth(rootEle.current.parentNode.getBoundingClientRect().width)
    }

    useEffect(() => {
        if (width === 0) {
            updateWidth()
        }
    })

    window.addEventListener('resize', _.throttle(updateWidth, 500, { trailing: true }))

    return (
        <div className="MMRChart-container" ref={rootEle} style={{ width: `${width}px` }}>
            { title && <h2>{title}</h2> }
            <LineChart
                width={width}
                height={width * 0.6}
                data={page}
                margin={{
                    left: -20, right: 0, top: 0, bottom: 0 
                }}
            >
                { players.map((player, index) => <Line type="monotone" key={player.name} dataKey={player.name} stroke={colors[index]} />,)}
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis domain={[min, max]} />
                <Legend />
                <Tooltip />
            </LineChart>
        </div>
    )
}

function fillEmpty(data) {
    for (let index = 1; index < data.length; index += 1) {
        const entry = data[index]
        const prevEntry = data[index - 1]
        Object.keys(prevEntry).forEach((key) => {
            if (entry[key] === undefined) {
                entry[key] = prevEntry[key]
            }
        })
    }
}

function getDateStamp(stamp) {
    const date = new Date(stamp)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
}

function getDailyChartData(matches) {
    if (!matches || matches.length === 0) {
        return null
    }
    let min = 1200
    let max = 1200
    let dataArray = _.map(matches, (match) => ({ name: getDateStamp(match.timestamp) }))
    dataArray = _.uniqBy(dataArray, 'name').reverse()

    matches.forEach((match) => {
        const dataObject = _.find(dataArray, (obj) => obj.name === getDateStamp(match.timestamp))

        // Handle both gains and losses for both colors.
        // Must check for gain and loss since remis are unpredictable in who has which.
        if (match.white.change !== undefined) {
            const whiteName = match.white.key
            const whiteRanking = Math.round(match.white.preRanking + match.white.change)
            dataObject[whiteName] = whiteRanking
            if (whiteRanking > max) max = whiteRanking
            if (whiteRanking < min) min = whiteRanking
        }

        if (match.black.change !== undefined) {
            const blackName = match.black.key
            const blackRanking = Math.round(match.black.preRanking + match.black.change)
            dataObject[blackName] = blackRanking
            if (blackRanking > max) max = blackRanking
            if (blackRanking < min) min = blackRanking
        }
    })

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // Transform into date
    dataArray.forEach((obj) => {
        const date = new Date(obj.name)
        obj.name = `${date.getDate()} ${monthNames[date.getMonth()]}`
    })

    fillEmpty(dataArray)

    return {
        data: dataArray,
        min,
        max,
    }
}

function mapStateToProps(state) {
    const { data, min, max } = getDailyChartData(state.matches.matches)
    const { players } = state.players
    return {
        data,
        players,
        min,
        max,
    }
}

export default connect(mapStateToProps)(MMRChart)
