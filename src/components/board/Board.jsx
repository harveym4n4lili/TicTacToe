import React from 'react';
import './Board.scss';
import '../square/Square.scss';
import Square from '../square/Square.jsx'
import ScoreBoard from '../scoreboard/ScoreBoard.jsx';

const Board = ({ value }) => {
    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [isX, setIsX] = React.useState(true);
    const [winner, setWinner] = React.useState(null);
    
    const  handleClick = (i) => {
        if (isX) {
            squares[i] = 'X';
        } else {
            squares[i] = 'O';
        }
        setSquares(squares);
        setIsX(!isX);

        setWinner(checkWin());
    }

    const checkWin = () => {
        const winRules = [
            [0,1,2],[3,4,5],[6,7,8], // 3 In Row
            [0,3,6],[1,4,7],[2,5,8], // 3 In Col
            [0,4,8],[2,4,6]//3 in diag
        ]
        for (const rule of winRules) {
            const [a, b, c] = rule;
            if (squares[a] && 
                squares[a] === squares[b] && 
                squares[a] === squares[c]) {
                return squares[a];
            }
        }
        for (const square of squares) {
            if (square === null) {
                return null;
            }
        }
        return "Tie";
    }

    return (
        <div className='game'>
            <div className='board'>
                <div className='board-row'>
                    <Square value={squares[0]} onClick={() => handleClick(0)} position="top-left" turn={squares[0]}/>
                    <Square value={squares[1]} onClick={() => handleClick(1)} position="top-center" turn={squares[1]}/>
                    <Square value={squares[2]} onClick={() => handleClick(2)} position="top-right" turn={squares[2]}/>
                </div>
                <div className='board-row'>
                    <Square value={squares[3]} onClick={() => handleClick(3)} position="middle-left" turn={squares[3]}/>
                    <Square value={squares[4]} onClick={() => handleClick(4)} position="middle-center" turn={squares[4]}/>
                    <Square value={squares[5]} onClick={() => handleClick(5)} position="middle-right" turn={squares[5]}/>
                </div>
                <div className='board-row'>
                    <Square value={squares[6]} onClick={() => handleClick(6)} position="bottom-left" turn={squares[6]}/>
                    <Square value={squares[7]} onClick={() => handleClick(7)} position="bottom-center" turn={squares[7]}/>
                    <Square value={squares[8]} onClick={() => handleClick(8)} position="bottom-right" turn={squares[8]}/>
                </div>
            </div>
            <ScoreBoard/>
        </div>
    )
};

export default Board;