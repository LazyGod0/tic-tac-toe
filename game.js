// Game state
let board = Array(9).fill("");
let isGameOver = false;

// DOM elements
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Initialize the game board
function initializeBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleMove(i));
        boardElement.appendChild(cell);
    }
}

// Handle player move
function handleMove(index) {
    if (board[index] === "" && !isGameOver) {
        // Player's move
        makeMove(index, 'X');
        
        if (!checkGameOver()) {
            setTimeout(makeAIMove, 500);
        }
    }
}

// Make a move (either player or AI)
function makeMove(index, player) {
    board[index] = player;
    document.querySelector(`[data-index="${index}"]`).textContent = player;
    checkGameOver();
}

function makeAIMove() {
    let bestScore = Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (checkAvailable(board[i])) {
            board[i] = "O";
            let score = minimax(board, 0, true);
            board[i] = "";
            if (score < bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== undefined) {
        makeMove(bestMove, "O");
    }
}

function checkGameOver() {
    const winner = checkWinner(board);
    if (winner === 'human') {
        statusElement.textContent = "You win!";
        isGameOver = true;
        return true;
    } else if (winner === 'ai') {
        statusElement.textContent = "AI wins!";
        isGameOver = true;
        return true;
    } else if (winner === 'tie') {
        statusElement.textContent = "It's a tie!";
        isGameOver = true;
        return true;
    }
    return false;
}
// Reset the game
function resetGame() {
    board = Array(9).fill("");
    isGameOver = false;
    statusElement.textContent = "Your turn (X)";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

// Add event listener for reset button
resetButton.addEventListener('click', resetGame);

// Fix for functions not defined in the original code
window.max = Math.max;
window.min = Math.min;

// Initialize the game
initializeBoard();
