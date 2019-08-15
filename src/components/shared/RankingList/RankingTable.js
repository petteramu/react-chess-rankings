import React from 'react'
import { Link } from 'react-router-dom'
function RankingTableHeader() {
    return <div className="ranking-table-header">
        <div className="ranking-table-cell">#</div>
        <div className="ranking-table-cell">MMR</div>
        <div className="ranking-table-cell">Name</div>
        <div className="ranking-table-cell">Streak</div>
        <div className="ranking-table-cell">W</div>
        <div className="ranking-table-cell">R</div>
        <div className="ranking-table-cell">L</div>
    </div>
}

function RankingTableRow (props) {
    return(
        <Link to={`/user/${props.data.name}`} className="ranking-table-row">
            <div className="ranking-table-cell">{ props.pos + 1 }.</div>
            <div className="ranking-table-cell">{ Math.round(props.data.ranking) }</div>
            <div className="ranking-table-cell ranking-name">{ props.data.name }</div>
            <div className={ (props.data.streak >= 3 ) ? 'ranking-table-cell ranking-streak hot' : 'ranking-table-cell ranking-streak'}>{ props.data.streak }</div>
            <div className="ranking-table-cell">{ props.data.wins }</div>
            <div className="ranking-table-cell">{ props.data.remis }</div>
            <div className="ranking-table-cell">{ props.data.losses }</div>
        </Link>
    )
}

class RankingTable extends React.Component {
    render () {
        const { players, isFetching } = this.props
        players.sort((a, b) => { 
            if (a.ranking > b.ranking) return -1
            if (a.ranking < b.ranking) return 1
            return 0
        })
        
        return (
            <>
                <div cellSpacing="0" className="ranking-table">
                    { !isFetching &&
                        <>
                            <RankingTableHeader></RankingTableHeader>
                            { players.map((data, index) => <RankingTableRow style={{opacity: isFetching ? 0.5 : 1}} key={index} pos={index} data={data}></RankingTableRow> ) }
                        </>
                    }
                </div>
                { isFetching && <h2>Loading...</h2>}
            </>
        )
    }
}

export default RankingTable
