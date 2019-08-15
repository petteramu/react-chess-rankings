import React from 'react'
import './Table.scss'

function Table(props) {
    return (
        <div className="nf6-table">
            { props.data.map((row) => <TableRow cells={row} />)}
        </div>
    )
}

function TableRow(props) {
    return (
        <div className="nf6-row">
            { props.cells.map((child) => <TableCell>{ child }</TableCell>)}
        </div>
    )
}

function TableCell(props) {
    return (
        <div className="nf6-cell">{ props.children }</div>
    )
}

export default Table
export { TableRow, TableCell }