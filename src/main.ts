import './style.css';
import { Board } from "./board.ts";


function initGame(container: HTMLDivElement | null) {
  if (!container) {
    throw new Error('Error loading game');
  }

  const board = new Board(10, 10, 15);
  const width = board.getWidth();
  const height = board.getHeight();

  const table = document.createElement('table');

  for (let i = 0; i < height; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < width; j++) {
      const cell = document.createElement('td');
      cell.textContent = board.getXYState(i, j);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

const app = document.querySelector<HTMLDivElement>('#app');
initGame(app);
