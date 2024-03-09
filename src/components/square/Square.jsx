import React, { useState } from 'react';
import './Square.scss';

const Square = ({ value, onClick, position, turn, gameOver}) => {

    const [clicked, setClicked] = useState(false);

    if (gameOver) {
        setClicked(false);
    }

    const handleClick = () => {
        if (clicked) return;
        onClick();
        setClicked(true);
    };

    return (
        <div className={`square  ${clicked ? `${position} clicked` : position}`}  
        onClick={handleClick} 
        player-turn={turn}
        > 
            <p>{value}</p>
        </div>
    );
};

export default Square;