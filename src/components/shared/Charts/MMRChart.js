import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { useMediaQuery, useTheme } from '@material-ui/core'
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
const grey = '#999'
const colors = [red, darkPurple, saffron, bananaMania, seaFoamGreen, silver,
    wine, vanilla, aquaMarine, onyx]

const PAGE_SIZE = 10

function MMRChart(props) {
    const {
        title,
        data,
        players,
        maxHeight,
        disableLegend,
    } = props
    const rootEle = React.createRef()
    const [pageNumber, setPage] = useState(1)
    const start = data.length - (pageNumber * PAGE_SIZE)
    const end = start + PAGE_SIZE
    const page = data.slice(start, end)
    const [width, setWidth] = useState(0)

    function updateHeight() {
        if (!rootEle.current) return
        const padding = 48
        const parentWidth = rootEle.current.parentNode.getBoundingClientRect().width
        setWidth(parentWidth - padding)
        console.log(parentWidth)
    }

    useEffect(() => {
        if (width === 0) {
            updateHeight()
        }
    })

    window.addEventListener('resize', _.throttle(updateHeight, 500, { trailing: true }))

    return (
        <div className="MMRChart-container" ref={rootEle} style={{ width: `100%` }}>
            <ResponsiveContainer aspect="1.6">
                <LineChart
                    data={page}
                    margin={{
                        left: -20, right: 0, top: 0, bottom: 0,
                    }}
                >
                    { players.map((player, index) => <Line type="monotone" key={player.name} dataKey={player.name} stroke={colors[index]} />,)}
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[min, max]} />
                    <Legend />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
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

function getDailyChartData(matches, playerNames) {
    let min = 1200
    let max = 1200
    if (!matches || matches.length === 0) {
        return {
            data: [],
        }
    }
    const filteredMatches = matches.filter((match) => (playerNames.indexOf(match.white.key) !== -1
        || playerNames.indexOf(match.black.key) !== -1))
    let dataArray = _.map(filteredMatches, (match) => ({ name: getDateStamp(match.timestamp) }))
    dataArray = _.uniqBy(dataArray, 'name').reverse()

    filteredMatches.forEach((match) => {
        const dataObject = _.find(dataArray, (obj) => obj.name === getDateStamp(match.timestamp))

        // Handle both gains and losses for both colors.
        // Must check for gain and loss since remis are unpredictable in who has which.
        // Should not add the data if the player isn't a player that should be included
        // or if the data already exists.
        // This is because we only want the last ranking of a day to be visible,
        // which will be the first match in the array
        const whiteName = match.white.key
        if (dataObject[whiteName] === undefined
            && match.white.change !== undefined
            && playerNames.indexOf(whiteName) !== -1) {
            const whiteRanking = Math.round(match.white.preRanking + match.white.change)
            dataObject[whiteName] = whiteRanking
            if (whiteRanking > max) max = whiteRanking
            if (whiteRanking < min) min = whiteRanking
        }

        const blackName = match.black.key
        if (dataObject[blackName] === undefined
            && match.black.change !== undefined
            && playerNames.indexOf(blackName) !== -1) {
            const blackRanking = Math.round(match.black.preRanking + match.black.change)
            dataObject[blackName] = blackRanking
            if (blackRanking > max) max = blackRanking
            if (blackRanking < min) min = blackRanking
        }

        dataObject.average = 1200
    })

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // Transform into date
    dataArray.forEach((obj) => {
        const date = new Date(obj.name)
        // eslint-disable-next-line no-param-reassign
        obj.name = `${date.getDate()} ${monthNames[date.getMonth()]}`
    })

    fillEmpty(dataArray)

    return {
        data: dataArray,
    }
}

function mapStateToProps(state, ownProps) {
    const playerNames = ownProps.players.map((player) => player.name)
    const { data } = getDailyChartData(state.matches.matches, playerNames)
    return {
        data,
    }
}

MMRChart.propTypes = {
    title: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })).isRequired,
    maxHeight: PropTypes.number,
    disableLegend: PropTypes.bool,
}

MMRChart.defaultProps = {
    title: '',
    maxHeight: 600,
    disableLegend: false,
}

export default connect(mapStateToProps)(MMRChart)
