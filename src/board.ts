import arrayShuffle from "array-shuffle";

enum State {
  Bomb = "💣",
  Empty = "",
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
}

export class Board {
  private width: number;
  private height: number;
  private numBombs: number;
  private state: State[];

  constructor(width: number, height: number, numBombs: number) {
    this.width = width;
    this.height = height;
    this.numBombs = numBombs;

    // state
    this.state = Array(this.width * this.height).fill(State.Empty);

    // bombs
    for (let i = 0; i < this.numBombs; i++) {
      this.state[i] = State.Bomb;
    }
    this.state = arrayShuffle(this.state);

    // bomb info
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const state = this.getXYState(x, y);
        if (state === State.Bomb) continue;
        let numBombs = 0;
        if (this.getXYState(x - 1, y - 1) === State.Bomb) numBombs++;
        if (this.getXYState(x, y - 1) === State.Bomb) numBombs++;
        if (this.getXYState(x + 1, y - 1) === State.Bomb) numBombs++;
        if (this.getXYState(x - 1, y) === State.Bomb) numBombs++;
        if (this.getXYState(x + 1, y) === State.Bomb) numBombs++;
        if (this.getXYState(x - 1, y + 1) === State.Bomb) numBombs++;
        if (this.getXYState(x, y + 1) === State.Bomb) numBombs++;
        if (this.getXYState(x + 1, y + 1) === State.Bomb) numBombs++;
        if (numBombs > 0)
          //@ts-ignore
          this.state[y * this.width + x] = numBombs.toString();
      }
    }
  }

  getXYState(x: number, y: number): State {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return State.Empty;
    }

    return this.state[y * this.width + x];
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
