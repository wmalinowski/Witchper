enum State {
    Bomb = 'B',
    Empty = ''
}

export class Board {
    // @ts-ignore
    private width: number;
    // @ts-ignore
    private height: number;
    // @ts-ignore
    private numBombs: number;
    private state: State[][];

    constructor(width: number, height: number, numBombs: number) {
        this.width = width;
        this.height = height;
        this.numBombs = numBombs;

        // TODO create a proper board and place bombs
        this.state = [
            [State.Bomb, State.Bomb, State.Empty, State.Empty, State.Empty],
            [State.Empty, State.Bomb, State.Empty, State.Bomb, State.Empty],
            [State.Empty, State.Empty, State.Empty, State.Empty, State.Empty],
            [State.Empty, State.Empty, State.Bomb, State.Bomb, State.Empty],
            [State.Empty, State.Empty, State.Empty, State.Empty, State.Empty]
        ];
    }

    getXYState(x: number, y: number): State {
        return this.state[x][y];
    }

    getWidth(): number {
        return this.state[0].length;
    }

    getHeight(): number {
        return this.state.length;
    }
}