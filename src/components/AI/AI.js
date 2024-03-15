
const getAIMove = (squares) => {
    // Algorithm to find next available moves.
    let availableMoves = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) availableMoves.push(i);
    }
    // need to implement minimax algorithm for AI to determine best logical moves.
    const ran = Math.floor(Math.random() * availableMoves.length); // RNG to decide moves.
    // getAiMOVE() returns index of gameboard
    return availableMoves[ran];
};

const minimax = (moves) => {

};

export default getAIMove;