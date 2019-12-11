import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

function XAxis(props) {
    const { max, min, num } = props

    if(!max || !min || !num) return null

    let range = new Array(num)
    const increment = (max - min) / num
    range = range.map(index => index * increment + min)

    return (
        <div className="x-axis">
            { range.map((val) => <div className="x-axis__value">{val}</div>) }
        </div>
    )
}

function YAxis(props) {
    const { max, min, num } = props

    if(!max || !min || !num) return null

    let range = new Array(num)
    const increment = (max - min) / num
    range = range.map(index => index * increment + min)

    return (
        <div className="y-axis">
            { range.map((val) => <div className="y-axis__value">{val}</div>) }
        </div>
    )
}

function Point(props) {
    const { xVal, yVal, next, xStep, yMin, yMax, ySize } = props
    
    const xPos = xVal * xStep
    const yPos = (yVal - yMin) / (yMax - yMin) * ySize

    return (
        <g className="mmr-graph__point">
            <circle cx={xPos} cy={yPos} r="50" />
        </g>
    )
}

function CustomChart(props) {
    const { data } = props
    const [containerEle, setContainer] = useState(null)
    const [width, setWidth] = useState(0)
    const self = this

    useEffect(() => {
        const node = ReactDOM.findDOMNode(self)
        if(node !== null && containerEle !== node.parentNode) {
            setContainer(node.parentNode)
        }
    })

    function updateWidth() {
        if(!containerEle) return
        setWidth(containerEle.getBoundingClientRect().width)
    }

    window.addEventListener("resize", _.throttle(updateWidth, 500))

    return (
        <svg id="mmr-graph" width={width} height={width * 0.6}>
            <rect fill="red" width={width} height={width * 0.6} />
            <g id="points">
                {/* <XAxis max="1500" min="1000" num="5" />
                <YAxis /> */}
                <g className="mmr-graph__content">
                    {/* {data.map((obj) => (
                        <div className="custom-chart__data-point"></div>
                    ))} */}
                </g>
            </g>
        </svg>
    )
}

export default CustomChart