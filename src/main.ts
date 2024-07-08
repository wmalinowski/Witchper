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
      cell.classList.add("covered");
      cell.onclick = () => {
        const cellState = board.getXYState(x, y);
        switch (cellState) {
          case "💣":
            soundSprites.play("monster");
            break;
          case "":
            soundSprites.play("clearing-fog");
            break;
        }
        cell.textContent = cellState;
        cell.classList.remove("covered");
        cell.classList.add("uncovered");
      };
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

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
