import React, { useEffect, useRef, useState } from 'react'
import Table from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import {
    TableHead,
    TableBody,
    TableRow,
    withStyles,
    TableCell,
    Paper,
} from '@material-ui/core'
import { KEY_CODES } from '../../../utils'
import history from '../../../history'

const StyledTableCell = withStyles((theme) => ({
    body: {
        cursor: 'pointer',
    },
    root: {
        padding: '10px 20px 10px 12px',
        'text-transform': 'capitalize',
        [theme.breakpoints.down('sm')]: {
            '&:first-child': {
                display: 'none',
            },
        },
        [theme.breakpoints.down('xs')]: {
            padding: '10px 10px 10px 12px',
            '&:nth-child(6), &:nth-child(6), &:nth-child(7)': {
                display: 'none',
            },
        },
        [theme.breakpoints.up('md')]: {
            '&:last-child': {
                display: 'none',
            },
        },
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '16px',
    },
}))(TableCell)

const StyledTableRow = withStyles(() => ({
    root: {
        '&:focus': {
            backgroundColor: '#eee',
        },
    },
}))(TableRow)

function RankingTable(props) {
    const { headerData, data } = props
    const [selectedIndex, setIndex] = useState(null)
    const refsArray = []

    const headerRef = useRef(null)
    const tableRef = useRef(null)
    const bodyRef = useRef(null)

    useEffect(() => {
        const ref = refsArray[selectedIndex]
        if (ref) {
            ref.setAttribute('tabIndex', '0')
            ref.focus()
        }
    })

    function focusNext() {
        if (selectedIndex !== null) { setIndex(selectedIndex + 1) } else { setIndex(0) }
    }

    function onKeyDown(e) {
        switch (e.keyCode) {
            case KEY_CODES.RIGHT:
                focusNext()
                break
            case KEY_CODES.LEFT: {
                const ref = refsArray[selectedIndex]
                ref.current.focus()
                break
            }
            case KEY_CODES.DOWN:
                focusNext()
                break

            default:
                break
        }
    }

    return (
        <Paper>
            <Table onKeyDown={onKeyDown} tabIndex="0" ref={tableRef}>
                <TableHead>
                    <TableRow onKeyDown={onKeyDown} ref={headerRef} tabIndex="-1">
                        { headerData.map((item) => (
                            <StyledTableCell key={item}>{item}</StyledTableCell>
                        )) }
                    </TableRow>
                </TableHead>
                <TableBody ref={bodyRef}>
                    { data.map((item) => (
                        <TableRowWithContext
                            key={item.link}
                            item={item}
                            onKeyDown={onKeyDown}
                        />
                    )) }
                </TableBody>
            </Table>
        </Paper>
    )
}

function TableRowWithContext(props) {
    const { item } = props

    function linkToPlayer() {
        history.push(item.link)
    }

    return (
        <StyledTableRow
            hover
            role="link"
            tabIndex="0"
            onClick={linkToPlayer}
        >
            { item.data.map((cell) => (
                <StyledTableCell key={cell.id}>{ cell.value }</StyledTableCell>
            ))}
        </StyledTableRow>
    )
}

TableRowWithContext.propTypes = {
    item: PropTypes.shape({
        link: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.any),
    }).isRequired,
}

RankingTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
        })),
    })).isRequired,
    headerData: PropTypes.arrayOf(PropTypes.string),
}

RankingTable.defaultProps = {
    headerData: [],
}

export default RankingTable
