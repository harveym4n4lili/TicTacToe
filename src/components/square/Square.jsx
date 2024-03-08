import React from 'react';
import './Square.scss';

const Square = ({ value, onClick, position }) => {
    return (
        <div className={`square ${position}`}  onClick={onClick}> 
            {value}
        </div>
    );
};

export default Square;