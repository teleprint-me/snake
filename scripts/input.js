class KeyboardInput {
    constructor(cell) {
        this._cell = cell;

        this.UP = 38
        this.DOWN = 40
        this.LEFT = 37
        this.RIGHT = 39;
        this.SPACE = 32;

        this.W = 87;
        this.S = 83;
        this.A = 65;
        this.D = 68;
        this.R = 82;
    }

    get cell() {
        return this._cell;
    }

    up() {
        if (this.cell.yVelocity == 1) {
            return;
        }
        this.cell.velocity = [0, -1];
    }

    down() {
        if (this.cell.yVelocity == -1) {
            return;
        }
        this.cell.velocity = [0, 1];
    }

    left() {
        if (this.cell.xVelocity == 1) {
            return;
        }
        this.cell.velocity = [-1, 0];
    }

    right() {
        if (this.cell.xVelocity == -1) {
            return;
        }
        this.cell.velocity = [1, 0];
    }

    reset() {
        this.cell.coordinate = [this.cell.grid.columns / 2, this.cell.grid.rows / 2];
        this.cell.velocity = [0, 0];
        this.cell.tail = [];
        this.cell.speed = 100;
    }

    pause() {
        this.cell.velocity = [0, 0];
    }

    evaluate(event) {
        switch (event.keyCode) {
            case this.UP:
            case this.W:
                this.up();
                this.debug("up");
                break;
            case this.DOWN:
            case this.S:
                this.down();
                this.debug("down")
                break;
            case this.LEFT:
            case this.A:
                this.left();
                this.debug("left");
                break;
            case this.RIGHT:
            case this.D:
                this.right();
                this.debug("right");
                break;
            case this.R:
                this.reset();
                this.debug("reset");
                break;
            case this.SPACE:
                this.pause();
                this.debug("paused");
                break;
            default:
                this.debug(`${event.keyCode}`);
                break;
        }
    }

    debug(message = undefined) {
        document.querySelector("#key").innerText = `K: ${message}`;
    }
}
