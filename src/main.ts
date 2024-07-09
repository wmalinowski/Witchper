import { Howl } from "howler";
import type { HowlOptions } from "howler";
import "./style.css";
import { Board } from "./board.ts";
import json from "./sprites.json";

function isHowlOptions(json: unknown): json is HowlOptions {
  return (
    !!json &&
    typeof json === "object" &&
    "src" in json &&
    Array.isArray(json.src) &&
    "sprite" in json &&
    typeof json.sprite === "object"
  );
}
if (!isHowlOptions(json)) throw new Error("Internal error");
const soundSprites = new Howl(json);

function refreshHTML(container: HTMLDivElement, board: Board) {
  const clickActionButton = <HTMLButtonElement>container.querySelector(
    ':scope [data-action="reveal_flag"]',
  );
  if (!clickActionButton) {
    throw new Error("Internal HTML error");
  }
  clickActionButton.textContent = board.currentAction;

  const tableEl = container.querySelector(":scope table");
  if (!tableEl) {
    throw new Error("Internal HTML error");
  }
  const cells = <NodeListOf<HTMLTableCellElement>>(
    tableEl.querySelectorAll(":scope td")
  );
  for (const cell of cells) {
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const state = board.getXYState(x, y);
    const covered = board.getCoveredState(x, y);

    cell.classList.value = "";

    if (covered === true) {
      cell.classList.add("covered");
    } else if (covered === false) {
      cell.classList.add("uncovered");
      cell.textContent = state;
    }
  }
}

//creating table
function initGame(container: HTMLDivElement | null) {
  if (!container) {
    throw new Error("Error loading game");
  }

  const stateCallback = refreshHTML.bind(null, container);

  const board = new Board(stateCallback, 13, 7, 10);
  const width = board.getWidth();
  const height = board.getHeight();

  const clickActionButton = document.createElement("button");
  clickActionButton.dataset.action = "reveal_flag";
  clickActionButton.textContent = board.currentAction;
  clickActionButton.addEventListener('click', () => {
    board.toggleAction();
  });
  container.appendChild(clickActionButton);

  const table = document.createElement("table");
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.classList.add("covered");
      cell.dataset.x = x.toString();
      cell.dataset.y = y.toString();

      //uncovering cells
      cell.onclick = () => {
        if (cell.classList.contains("covered")) {
        const cellState = board.uncover(x, y);
        switch (cellState) {
          case "💣":
            soundSprites.play("monster");
            break;
          case "":
            soundSprites.play("clearing-fog");
            break;
          default:
            soundSprites.play("monster");
        }
      }
      };

      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

//music switcher
function switchMusic(event: Event) {
  const switchEl = <HTMLSelectElement>event.currentTarget;
  if (!switchEl.value) {
    return;
  }

  const value = switchEl.value;
  soundSprites.stop();
  switch (value) {
    case "background1":
      soundSprites.play("background1");
      break;
    case "background2":
      soundSprites.play("background2");
      break;
  }
}

const app = document.querySelector<HTMLDivElement>("#app");
initGame(app);

const musicSwitcher = document.querySelector<HTMLDivElement>("#music-switcher");
musicSwitcher?.addEventListener("change", switchMusic);
