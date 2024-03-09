import React from 'react';
import '../scoreboard/ScoreBoard.scss'

const ScoreBoard = ({ winner_value }) => {

    return (
        <div className='scores'>
            <div className='scoreboard'>
                <div className='section'>
                    <p className='player score-title'>Player</p>
                    <p className='player score'>0</p>
                </div>
                <div className='section'>
                    <p className='AI score-title'>AI</p>
                    <p className='AI score'>0</p>
                </div>
                <div className='section'>
                    <p className='Tie score-title'>Ties</p>
                    <p className='Tie score'>0</p>
                </div>
            </div>
        </div>
    )
};
export default ScoreBoard;