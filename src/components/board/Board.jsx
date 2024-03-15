import React, { useEffect, useState } from 'react';
import './Board.scss';
import '../square/Square.scss';
import getAIMove from '../AI/AI.js'; // Import AI logic
import Square from '../square/Square.jsx'
import ScoreBoard from '../scoreboard/ScoreBoard.jsx';

const Board = ({ value }) => {
    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [winningSquares, setWinningSquares] = React.useState(Array(9).fill(false));

    const [isX, setIsX] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [resetToggle, setResetToggle] = useState(false);

    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [tieScore, setTieScore] = useState(0);
    
    const  handleClick = (i) => {
        if (gameOver || squares[i] !== null) return;

        squares[i] = isX ? 'X' : 'O';
        setSquares(squares);
        setIsX(!isX);
        console.log(squares);
        const result = checkWin();
        incrementScore(result);
        finishGame(result);
    }
    useEffect(() => {
        if (!isX && !gameOver) performAIMove(squares);
    }, [gameOver, isX, squares])


    const performAIMove = (board) => {
        const aiMove = getAIMove(board);
        if (board[aiMove] === null) {
            board[aiMove] = 'O';
            setSquares(board);
            setIsX(true);
            console.log(squares);
            const aiResult = checkWin();
            incrementScore(aiResult);
            finishGame(aiResult);
        }
    }; 

    const incrementScore = (x) => {
        if (x === "X") {
            setPlayerScore( playerScore + 1 );
        } else if (x === "O") {
            setAiScore( aiScore + 1 );
        } else if (x === "Tie") {
            setTieScore( tieScore + 1 );
        } else return;
    };

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

                winningSquares[a] = true;
                winningSquares[b] = true;
                winningSquares[c] = true;

                return squares[a];
            }
        }
        for (const square of squares) {
            if (square === null) {
                return null;
            }
        }
        setWinningSquares(Array(9).fill(true));
        return "Tie";
    }

    const finishGame = (x) =>  {
        if (x != null) {
            setGameOver(true);
        }
    };
    const resetGame = (x) => {
        if (x){
            setResetToggle(true);
            setTimeout(() => {
                setSquares(Array(9).fill(null));
                setWinningSquares(Array(9).fill(false));
                setIsX(true);
                setGameOver(false);
                setResetToggle(false);
            }, 1000);
        }
        // onclick method for reset overlay 
    }

    return (
        <div className='game'>
            <div className='board'>
                <div className='board-row'>
                    <Square value={squares[0]} winningSquare={winningSquares[0]} onClick={() => handleClick(0)} position="top-left" turn={squares[0]} gameOver={gameOver} resetToggle={resetToggle}/>
                    <Square value={squares[1]} winningSquare={winningSquares[1]} onClick={() => handleClick(1)} position="top-center" turn={squares[1]} gameOver={gameOver} resetToggle={resetToggle}/>
                    <Square value={squares[2]} winningSquare={winningSquares[2]} onClick={() => handleClick(2)} position="top-right" turn={squares[2]} gameOver={gameOver} resetToggle={resetToggle}/>
                </div>
                <div className='board-row'>
                    <Square value={squares[3]} winningSquare={winningSquares[3]} onClick={() => handleClick(3)} position="middle-left" turn={squares[3]} gameOver={gameOver} resetToggle={resetToggle}/>
                    <Square value={squares[4]} winningSquare={winningSquares[4]} onClick={() => handleClick(4)} position="middle-center" turn={squares[4]} gameOver={gameOver} resetToggle={resetToggle}/>
                    <Square value={squares[5]} winningSquare={winningSquares[5]} onClick={() => handleClick(5)} position="middle-right" turn={squares[5]} gameOver={gameOver} resetToggle={resetToggle}/>
                </div>
                <div className='board-row'>
                    <Square value={squares[6]} winningSquare={winningSquares[6]} onClick={() => handleClick(6)} position="bottom-left" turn={squares[6]} gameOver={gameOver} resetToggle={resetToggle}/>
                    <Square value={squares[7]} winningSquare={winningSquares[7]} onClick={() => handleClick(7)} position="bottom-center" turn={squares[7]} gameOver={gameOver}resetToggle={resetToggle}/>
                    <Square value={squares[8]} winningSquare={winningSquares[8]} onClick={() => handleClick(8)} position="bottom-right" turn={squares[8]} gameOver={gameOver} resetToggle={resetToggle}/>
                </div>
                {gameOver && !resetToggle && <div className={`highlight-overlay ${resetToggle ? `clicked`: ``}`} onClick={() => resetGame(gameOver)}>↻</div>}
            </div>
            <ScoreBoard playerScore={playerScore} aiScore={aiScore} tieScore={tieScore}/>
        </div>
    )
};

export default Board;