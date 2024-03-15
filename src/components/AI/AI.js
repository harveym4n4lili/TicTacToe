
const getAIMove = (gameState) => {

    // Algorithm to find next available moves.
    let availableMoves = getAvailableMoves(gameState);
    let bestMoveScore = -Infinity; // set to lowest value to ensure higher scores can be updated.
    let bestMove;

    /// We have a list of possible x moves that AI can choose.
    /// AI can then forsee the other moves to be played after making the xth move.
    /// This creates a tree of moves, with each node representing a state of the game.
    /// And all leaf nodes represent a terminal state where the game ends in tie or X/O win.

    /// Minimax will provide a score for each outcome:
    /// Using recursion, AI simulates all sequential moves until game end.
    /// Leaf node gets a score from minimax which ripples back all the way to original root node,
    /// To help decide what move to go from root node.

    // Check all moves to find best move
    for (let i = 0; i < availableMoves.length; i++) {
      let newState = gameState.slice() // Duplicate game state to avoid changing OG state.
      newState[availableMoves[i]] = 'O'; // Simulate AI move.
      let currentMoveScore = minimax(newState, 0, false);
      if (currentMoveScore > bestMoveScore) {
        bestMoveScore = currentMoveScore;
        bestMove = availableMoves[i];
      } // update best move depending on result of minimax
    }
    return bestMove;
};

const minimax = (simulatedState, depth, maximizing) => {
  /// These conditions give a base score on the terminal states.
  /// The base score is used and rippled up in the previous recursions,
  /// to give a final overall score on a possible move of the root state.
  /// The constant 10 is a heuristic value that provides clearer distinction between
  /// positive and negative scores.
  /// This means if 10 was lowered, the best winning/losing scores will have lesser extreme
  /// values.
  if (checkWin(simulatedState) === 'O') {
    return 10 - depth;
  } else if (checkWin(simulatedState) === 'X') {
    return depth - 10;
  } else if (getAvailableMoves(simulatedState).length === 0) {
    return 0;
  }

  /// Each depth of the tree alternates between max and min score.
  /// we alternate between maximizing and minimizing to find best possible moves for AI (max),
  /// whilst anticipating the least favourable moves from the player (min).
  if (maximizing) {
    let bestMoveScore = -Infinity;
    let availableMoves = getAvailableMoves(simulatedState);
    for (let i = 0; i < availableMoves.length; i++) {
      let newState = simulatedState.slice() // duplicate game state
      newState[availableMoves[i]] = 'O'; // simulate AI move
      let currentMoveScore = minimax(newState, depth + 1, false);
      if (currentMoveScore > bestMoveScore) {
        bestMoveScore = currentMoveScore;
      }
    }
    return bestMoveScore;
  } else {
    let worstMoveScore = Infinity; // Set to highest value to ensure lower scores can be updated.
    let availableMoves = getAvailableMoves(simulatedState);
    for (let i = 0; i < availableMoves.length; i++) {
      let newState = simulatedState.slice() // duplicate game state
      newState[availableMoves[i]] = 'X'; // simulate Player move
      let currentMoveScore = minimax(newState, depth + 1, true);
      if (currentMoveScore < worstMoveScore) {
        worstMoveScore = currentMoveScore;
      }
    }
    return worstMoveScore;
  }
};

const getAvailableMoves = (squares) => {
  let moves = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) moves.push(i);
  }
  return moves;
};

const checkWin = (squares) => {
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
  // Checkwin algorithm copied from board.jsx, need to move game logic to a seperate codebase.
}

export default getAIMove;