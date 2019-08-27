import React from 'react'
import { FaChessKnight, FaChessBishop, FaChessKing, FaChessQueen, FaChessPawn, FaChessRook } from 'react-icons/fa'
import './LoadingScreen.scss'

const spinners = [<FaChessKnight />, <FaChessBishop />, <FaChessKing />, <FaChessQueen />, <FaChessPawn />, <FaChessRook />]
let num = Math.floor(Math.random() * spinners.length)
const SelectedSpinner = spinners[num]
function LoadingScreen(props) {
    return (
        <div class="loading-screen">{SelectedSpinner}</div>
    )
}

export default LoadingScreen