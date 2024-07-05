import arrayShuffle from 'array-shuffle';

enum State {
    Bomb = 'B',
    Empty = ''
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
        
        this.state = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.state.push(State.Empty);
            }
        }

        for (let i = 0; i < this.numBombs; i++) {
            this.state[i] = State.Bomb
        }
        this.state = arrayShuffle(this.state)
    }

    getXYState(x: number, y: number): State {
        return this.state[y*this.width+x];
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}