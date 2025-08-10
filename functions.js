const rows = 3
const columns = 3

// Here is winning condition
const winningCondition = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

// score object is used to map the score for each side
const score = {
  "human" : 1,
  "ai" : -1,
  "tie" : 0
}
// Use one dimensional array
const checkWinner = (board) => {
  for (let index = 0; index < winningCondition.length; index++) {
    const [a, b, c] = winningCondition[index];
    
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === "X" ? "human" : "ai";
    }
  }

  // If the board is full then return "tie"
  if (!board.includes("")) {
    return "tie";
  }

  // If no condition is matched then return null
  return null;
}

// Check that square is available or not
const checkAvailable = (square) => {
  return square === "" ? true : false
}

const minimax = (board,dept,isMaximizing) => {
  // return score if there is the winner or tie
  if(checkWinner(board)) {
    return score[checkWinner(board)]
  }

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0 ; i < 9 ; i++) {
        if(checkAvailable(board[i])) {
          board[i] = "X"
          // Get score from every possibilities
          let score = minimax(board,dept+1,false)
          // Remove the square to make it available
          board[i] = ""
          bestScore = Math.max(score,bestScore)
        }
      
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0 ; i < 9 ; i++) {
      
        if(checkAvailable(board[i])) {
          board[i] = "O"
          // Get score from every possibilities
          let score = minimax(board,dept+1,true)
          board[i] = ""
          bestScore = Math.min(score,bestScore)
        }
      }
    
    return bestScore
  }
}

