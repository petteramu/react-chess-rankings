import React from 'react'
import Table from '@material-ui/core/Table'
import { TableHead, TableBody, TableRow, withStyles, TableCell, Paper } from '@material-ui/core';
import { history } from '../../../index'

const StyledTableCell = withStyles(theme => ({
    body: {
        cursor: 'pointer'
    },
    root: {
        padding: "10px 20px 10px 12px",
        'text-transform': 'capitalize',
        [theme.breakpoints.down('sm')]: {
            "&:first-child": {
                display: "none"
            }
        },
        [theme.breakpoints.down('xs')]: {
            padding: "10px 10px 10px 12px",
        }
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '16px'
    }
}))(TableCell)

function RankingTable(props) {
    const { headerData, data, match } = props

    function linkToPlayer(link) {
        history.push(link)
    }

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        { headerData.map(item => <StyledTableCell>{item}</StyledTableCell>) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map(item => 
                        <TableRow hover role="link" key={item.link} onClick={linkToPlayer.bind(this, item.link)}>
                            { item.data.map(cell => <StyledTableCell>{ cell }</StyledTableCell>) }
                        </TableRow>
                    ) }
                </TableBody>
            </Table>
        </Paper>
    )
}

export default RankingTable
