const board = document.querySelector(`.board`);

for (let i = 0; i <9; i++) {
  const cell = document.createElement(`div`);
  cell.classList.add(`cell`);
  cell.setAttribute(`data-id`, i+1)
  board.appendChild(cell);
}