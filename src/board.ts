import arrayShuffle from "array-shuffle";

enum FieldInfo {
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

type StateCallback = (board: Board) => void;

export class Board {
  private width: number;
  private height: number;
  private numBombs: number;

  private state: FieldInfo[];
  private coveredFields: Boolean[];
  private onStateChanged: StateCallback;

  constructor(
    onStateChanged: StateCallback,
    width: number,
    height: number,
    numBombs: number,
  ) {
    this.onStateChanged = onStateChanged;
    this.width = width;
    this.height = height;
    this.numBombs = numBombs;

    // state
    this.state = Array(this.width * this.height).fill(FieldInfo.Empty);
    this.coveredFields = Array(this.width * this.height).fill(true);

    // bombs
    for (let i = 0; i < this.numBombs; i++) {
      this.state[i] = FieldInfo.Bomb;
    }
    this.state = arrayShuffle(this.state);

    // bomb info
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const state = this.getXYState(x, y);
        if (state === FieldInfo.Bomb) continue;
        let numBombs = 0;
        if (this.getXYState(x - 1, y - 1) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x, y - 1) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x + 1, y - 1) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x - 1, y) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x + 1, y) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x - 1, y + 1) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x, y + 1) === FieldInfo.Bomb) numBombs++;
        if (this.getXYState(x + 1, y + 1) === FieldInfo.Bomb) numBombs++;
        if (numBombs > 0)
          //@ts-ignore
          this.state[y * this.width + x] = numBombs.toString();
      }
    }
  }

  getXYState(x: number, y: number): FieldInfo {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return FieldInfo.Empty;
    }

    return this.state[y * this.width + x];
  }

  getCoveredState(x: number, y: number): Boolean | undefined {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return;
    }

    return this.coveredFields[y * this.width + x];
  }

  uncover(x: number, y: number): FieldInfo | undefined {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return undefined;
    }
    if (this.coveredFields[y * this.width + x] === false) {
      return;
    }
    this.coveredFields[y * this.width + x] = false;
    const fieldInfo = this.getXYState(x, y);

    if (fieldInfo === FieldInfo.Empty) {
      if (this.getXYState(x - 1, y - 1) !== FieldInfo.Bomb) {
        this.uncover(x - 1, y - 1);
      }
      if (this.getXYState(x, y - 1) !== FieldInfo.Bomb) {
        this.uncover(x, y - 1);
      }
      if (this.getXYState(x + 1, y - 1) !== FieldInfo.Bomb) {
        this.uncover(x + 1, y - 1);
      }
      if (this.getXYState(x - 1, y) !== FieldInfo.Bomb) {
        this.uncover(x - 1, y);
      }
      if (this.getXYState(x + 1, y) !== FieldInfo.Bomb) {
        this.uncover(x + 1, y);
      }
      if (this.getXYState(x - 1, y + 1) !== FieldInfo.Bomb) {
        this.uncover(x - 1, y + 1);
      }
      if (this.getXYState(x, y + 1) !== FieldInfo.Bomb) {
        this.uncover(x, y + 1);
      }
      if (this.getXYState(x + 1, y + 1) !== FieldInfo.Bomb) {
        this.uncover(x + 1, y + 1);
      }
    }

    if (this.onStateChanged) this.onStateChanged(this);
    return fieldInfo;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
