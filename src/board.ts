enum State {
    Bomb = 'B',
    Empty = ''
}

export class Board {
    private width: number;
    private height: number;
    //private numBombs: number;
    private state: State[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        //this.numBombs = numBombs;
        
        this.state = [];
        for (let i = 0; i < this.height; i++) {
            this.state.push([]);
            for (let j = 0; j < this.width; j++) {
                this.state[i].push(State.Empty);
            }
        }
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