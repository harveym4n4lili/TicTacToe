import React from 'react';
import './Board.scss';
import '../square/Square.scss';
import Square from '../square/Square.jsx'

const Board = ({ value }) => {
    
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [isX, setIsX] = React.useState(true)
    
    const  handleClick = (i) => {
        squares[i] = isX ? 'X' : 'O'
        setSquares(squares)
        setIsX(!isX)
    }

    return (
        <div className='game'>
            <div className='board'>
                <div className='board-row'>
                    <Square value={squares[0]} onClick={() => handleClick(0)} position="top-left"/>
                    <Square value={squares[1]} onClick={() => handleClick(1)} position="top-center"/>
                    <Square value={squares[2]} onClick={() => handleClick(2)} position="top-right"/>
                </div>
                <div className='board-row'>
                    <Square value={squares[3]} onClick={() => handleClick(3)} position="middle-left"/>
                    <Square value={squares[4]} onClick={() => handleClick(4)} position="middle-center"/>
                    <Square value={squares[5]} onClick={() => handleClick(5)} position="middle-right"/>
                </div>
                <div className='board-row'>
                    <Square value={squares[6]} onClick={() => handleClick(6)} position="bottom-left"/>
                    <Square value={squares[7]} onClick={() => handleClick(7)} position="bottom-center"/>
                    <Square value={squares[8]} onClick={() => handleClick(8)} position="bottom-right"/>
                </div>
            </div>
        </div>
    );
};

export default Board;