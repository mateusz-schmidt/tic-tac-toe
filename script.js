const board = document.querySelector(`.board`);

const gameBoard = (function () {
  const cells = [];
  for (let i = 0; i < 9; i++) {
    cells[i] = null;
  }
  return cells;
})();

function drawBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement(`div`);
    cell.addEventListener(`click`, playTurn);
    cell.classList.add(`cell`);
    cell.setAttribute(`data-index`, `${i}`);
    if (gameBoard[i] === null) {
      cell.textContent = ``;
    } else {
      cell.textContent = `${gameBoard[i]}`;
    }
    board.appendChild(cell);
  }
}

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];

function checkWinner(board) {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // "X" or "O"
    }
  }
  return null; // no winner yet
}

function isFull(board) {
  return board.every(cell => cell !== null);
}

let currentPlayer = `X`;

drawBoard();

function playTurn(e) {
  const index = Number(e.target.dataset.index);

  // Ignore clicks on already filled cells
  if (gameBoard[index] !== null) return;

  // Place mark
  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Check state
  const winner = checkWinner(gameBoard);

  if (winner) {
    setTimeout(() => {
      alert(`The winner is ${winner}`);
    }, 500);
  } else if (isFull(gameBoard)) {
    setTimeout(() => {
      alert("It's a draw");
    }, 500);
  }
}
