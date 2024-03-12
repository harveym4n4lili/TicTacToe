import React, { useState, useEffect } from 'react';
import './Square.scss';

const Square = ({ value, onClick, position, turn, gameOver, winningSquare, resetToggle}) => {

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (gameOver) {
            setClicked(false);
        } 
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
        ${clicked ? `clicked` : `notClicked`}  
        ${gameOver === true ? 'disable' : ''}
        ${resetToggle ? 'reset' : ''}
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