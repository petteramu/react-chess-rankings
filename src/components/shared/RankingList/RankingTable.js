import React from 'react'
import Table from '@material-ui/core/Table'
import {
    TableHead,
    TableBody,
    TableRow,
    withStyles,
    TableCell,
    Paper,
} from '@material-ui/core';
import { history } from '../../../index'
import { KEY_CODES } from '../../../utils'

const StyledTableCell = withStyles(theme => {
    return {
    body: {
        cursor: 'pointer'
    },
    root: {
        padding: "10px 20px 10px 12px",
        'text-transform': 'capitalize',
        [theme.breakpoints.down('sm')]: {
            "&:first-child": {
                display: "none",
            },
        },
        [theme.breakpoints.down('xs')]: {
            padding: "10px 10px 10px 12px",
            "&:nth-child(6), &:nth-child(6), &:nth-child(7)": {
                display: "none",
            },
        },
        [theme.breakpoints.up('md')]: {
            "&:last-child": {
                display: "none",
            },
        }
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '16px'
    }
}})(TableCell)

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:focus": {
            backgroundColor: '#eee'
        }
    }
}))(TableRow)

class RankingTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: null
        }
        
        this.refsArray = []
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    linkToPlayer(link) {
        history.push(link)
    }

    componentDidUpdate() {
        let ref = this.refsArray[this.state.selectedIndex]
        if(ref) {
            ref.setAttribute("tabIndex", "0")
            ref.focus()
        }
    }

    getNextElement() {
        if(this.state.selectedIndex)
            this.setState({ selectedIndex: this.state.selectedIndex + 1})
        else
            this.setState({ selectedIndex: 0 })
    }

    focusNext(down) {
        if(this.state.selectedIndex !== null)
            this.setState({ selectedIndex: this.state.selectedIndex + 1})
        else
            this.setState({ selectedIndex: 0 })
    }

    focusFirst() {
        if(this.headerRef && this.headerRef.current){
            this.headerRef.current.setAttribute("tabIndex", "0")
            this.headerRef.current.focus()
            this.selectedElement = this.headerRef.current
        }
    }

    onKeyDown(e) {
        switch(e.keyCode) {
            case KEY_CODES.RIGHT:
                this.focusNext()
                return
            case KEY_CODES.LEFT:
                this.blurMenu(e)
                this.ref.current.focus()
                return
            case KEY_CODES.DOWN:
                this.focusNext()
                return
            case KEY_CODES.UP:
            return
            default:
                return
        }
    }

    render() {
        return (
            <Paper>
                <Table onKeyDown={this.onKeyDown} tabIndex="0" ref={this.tableRef}>
                    <TableHead>
                        <TableRow onKeyDown={this.onKeyDown} ref={this.headerRef} tabIndex="-1">
                            { this.props.headerData.map(item => <StyledTableCell>{item}</StyledTableCell>) }
                        </TableRow>
                    </TableHead>
                    <TableBody ref={this.bodyRef}>
                        { this.props.data.map((item, index) => 
                            <StyledTableRow
                                hover
                                role="link"
                                tabIndex="0"
                                key={item.link}
                                ref={(ref) => this.refsArray[index] = ref}
                                onKeyDown={this.onKeyDown}
                                onClick={this.linkToPlayer.bind(this, item.link)}>
                                { item.data.map((cell, index) =>
                                    <StyledTableCell key={index}>{ cell }</StyledTableCell>)
                                }
                            </StyledTableRow>
                        ) }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default RankingTable
