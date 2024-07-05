import "./style.css";
import { Board } from "./board.ts";

function initGame(container: HTMLDivElement | null) {
  if (!container) {
    throw new Error("Error loading game");
  }

  const board = new Board(13, 7, 20);
  const width = board.getWidth();
  const height = board.getHeight();

  const table = document.createElement("table");

  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.textContent = board.getXYState(x, y);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

const app = document.querySelector<HTMLDivElement>("#app");
initGame(app);
