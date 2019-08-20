import React from 'react'
import { Link } from 'react-router-dom'
import './RankingTable.scss'

function RankingTableHeader(props) {
    if(!Array.isArray(props.data)) return "Faulty data given to TableHeader"

    return <div className="ranking-table-header">
        { props.data.map(itemData => <div className="ranking-table-cell">{ itemData }</div>) }
    </div>
}

function RankingTableRow (props) {
    if(!Array.isArray(props.data)) return "Faulty data given to TableRow"
    return(
        <Link to={props.linkTo} className="ranking-table-row">
            { props.data.map((itemData) => <div className="ranking-table-cell">{ itemData }</div>) }
        </Link>
    )
}

class RankingTable extends React.Component {

    render () {
        const { data, isFetching } = this.props
        return (
            <>
                <div cellSpacing="0" className="ranking-table">
                    { !isFetching &&
                        <>
                            <RankingTableHeader data={this.props.headerData} />
                            { data.map((itemData, index) => <RankingTableRow
                                style={{opacity: isFetching ? 0.5 : 1}}
                                key={index}
                                data={itemData.data}
                                linkTo={itemData.link} /> ) }
                        </>
                    }
                </div>
                { isFetching && <h2>Loading...</h2>}
            </>
        )
    }
}

export default RankingTable
