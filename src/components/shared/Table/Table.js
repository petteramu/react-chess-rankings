import React from 'react'
import PropTypes from 'prop-types'
import './Table.scss'

function Table(props) {
    const { data } = props

    return (
        <div className="nf6-table">
            { data.map((row) => <TableRow cells={row} />)}
        </div>
    )
}

function TableRow(props) {
    const { cells } = props
    return (
        <div className="nf6-row">
            { cells.map((child) => <TableCell>{ child }</TableCell>)}
        </div>
    )
}

function TableCell(props) {
    const { children } = props
    return (
        <div className="nf6-cell">{ children }</div>
    )
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
}

TableRow.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.any).isRequired,
}

TableCell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]).isRequired,
}

export default Table
export { TableRow, TableCell }
