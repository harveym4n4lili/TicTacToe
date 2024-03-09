import React from 'react';
import '../scoreboard/ScoreBoard.scss'

const ScoreBoard = ({ playerScore, aiScore, tieScore}) => {

    return (
        <div className='scores'>
            <div className='scoreboard'>
                <div className='section'>
                    <p className='player score-title'>Player</p>
                    <p className='player score'>{playerScore}</p>
                </div>
                <div className='section'>
                    <p className='AI score-title'>AI</p>
                    <p className='AI score'>{aiScore}</p>
                </div>
                <div className='section'>
                    <p className='Tie score-title'>Ties</p>
                    <p className='Tie score'>{tieScore}</p>
                </div>
            </div>
        </div>
    )
};
export default ScoreBoard;