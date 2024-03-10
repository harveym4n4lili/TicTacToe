import React, { useState, useEffect } from 'react';
import './Square.scss';

const Square = ({ value, onClick, position, turn, gameOver, winningSquare}) => {

    const [clicked, setClicked] = useState(false);
    const [timerComplete, setTimerComplete] = useState(false);

    useEffect(() => {
        let timer;
        if (gameOver) {
            setClicked(false);

            timer = setTimeout(() => {
                setTimerComplete(true);
            }, 2000);
        } else {
            setTimerComplete(false);
        }

        return () => clearTimeout(timer);
    },[gameOver]);

    useEffect(() => {
        
    }, [gameOver]);

    const handleClick = () => {
        if (clicked || gameOver) return;
        onClick();
        setClicked(true);
    };

    return (
        <div className={`square  
        ${clicked ? `${position} clicked` : position}  
        ${gameOver === true ? 'disable' : ''}
        ${timerComplete ? 'reset' : ''}
        ${winningSquare ? 'highlight' : ''}
        `}  
        onClick={handleClick} 
        player-turn={turn}
        > 
            <p>{value}</p>
        </div>
    );
};

export default Square;