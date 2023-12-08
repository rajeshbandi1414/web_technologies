const board = document.getElementById('board');
const squares = [];



function toggleSquare(index) {
  const row = Math.floor(index / 5);
  const col = index % 5;
  const adjacentSquares = [
    index,       // The clicked square
    index - 5,   // Above
    index + 5,   // Below
    index - 1,   // Left
    index + 1,   // Right
  ];

  adjacentSquares.forEach((adjacentIndex) => {
    if (adjacentIndex >= 0 && adjacentIndex < 25) {
      const adjRow = Math.floor(adjacentIndex / 5);
      const adjCol = adjacentIndex % 5;
      // Toggle the square if it's the clicked square or directly adjacent (not diagonal)
      if (index === adjacentIndex || (Math.abs(row - adjRow) + Math.abs(col - adjCol) === 1)) {
        squares[adjacentIndex].classList.toggle('is-off');
      }
    }
  });
}


function checkGameState() {
  const isWin = squares.every((square) => square.classList.contains('is-off'));
  if (isWin) {
    displayWin();
  } else if (moves >= MAX_MOVES) {
    displayLoss();
  }
}

function displayWin() {
  window.alert('Congratulations! You win');
}

function displayLoss() {
  window.alert('Game over!');
}

function newGame() {
  resetBoard();
}

function resetBoard() {
  squares.forEach((square) => {
    const randomState = Math.random() < 0.5;
    if (randomState) {
      square.classList.add('is-off');
    } else {
      square.classList.remove('is-off');
    }
  });
}

for (let i = 0; i < 25; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  squares.push(square);
  board.appendChild(square);

  square.addEventListener('click', () => {
    toggleSquare(i);
    checkGameState();
  });
}

newGame(); // Start a new game when the script loads
