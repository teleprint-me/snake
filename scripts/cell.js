class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get coordinate() {
        return [this.x, this.y];
    }

    set coordinate(position = [0, 0]) {
        this.x = position[0];
        this.y = position[1];
    }
}

class Cell extends Vector {
    constructor(grid, x = 0, y = 0) {
        super(x, y);
        
        this.grid = grid;

        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    get velocity() {
        return [this.xVelocity, this.yVelocity];
    }

    set velocity(rate) {
        this.xVelocity = rate[0];
        this.yVelocity = rate[1];
    }

    updateVector() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }

    debug() {
        document.querySelector("#cell").innerText = `X: ${this.x} | Y: ${this.y}`;
    }
}

class Snake extends Cell {
    constructor(grid, x = 0, y = 0) {
        super(grid, x, y);

        this.tail = [];
        this.length = 0;
        this.speed = 100;
    }

    updateSpeed() {
        // speed is determined by canvas refresh rate
        // refresh rate is in milliseconds due to the setTimeout delay parameter
        switch (this.length) {
            case 5:
                this.speed = 90;
                return true;
            case 10:
                this.speed = 80;
                return true;
            case 75:
                this.speed = 70;
                return true;
            case 100:
                this.speed = 60;
                return true;
            case 250:
                this.speed = 50;
                return true;
            case 500:
                this.speed = 40;
                return true;
            case 1000:
                this.speed = 30;
                return true;
            case 2000:
                this.speed = 25;
                return true;
            default:
                return false;
        }
    }

    detectTailCollision() {
        for (let i = 0; i < this.tail.length; i++) {
            let segment = this.tail[i];
            if (this.x === segment.x && this.y === segment.y) {
                return true;
            }
        }
        return false;
    }

    detectWallCollision() {
        if (this.x < 0) {
            this.coordinate = [0, this.y];
            this.velocity = [0, 0];
            return true;
        } else if (this.x > this.grid.columns - 1) {
            this.coordinate = [this.grid.columns - 1, this.y];
            this.velocity = [0, 0];
            return true;
        } else if (this.y < 0) {
            this.coordinate = [this.x, 0];
            this.velocity = [0, 0];
            return true;
        } else if (this.y > this.grid.rows - 1) {
            this.coordinate = [this.x, this.grid.rows - 1];
            this.velocity = [0, 0];
            return true;
        }
        return false;
    }

    draw() {
        let width = this.grid.cellDimension[0];
        let height = this.grid.cellDimension[1];

        this.grid.context.fillStyle = "rgb(0, 100, 0)";
        
        // put an item at the end of the list next to the head
        this.tail.push(new Vector(this.x - this.xVelocity, this.y - this.yVelocity));

        for (let i = 0; i < this.tail.length; i++) {
            let segment = this.tail[i];
            this.grid.context.fillRect(
                segment.x * width,
                segment.y * height,
                width,
                height
            );
        }

        // remove the cells exceeding the tail length
        while (this.tail.length > this.length) {
            this.tail.shift();
        }

        this.grid.context.fillStyle = "rgb(250, 150, 0)";
        this.grid.context.fillRect(this.x * width, this.y * height, width, height);
    }

    debug() {
        document.querySelector("#cell").innerHTML =
            `X: ${this.x} | Y: ${this.y} | ` +
            `Xv: ${this.xVelocity} | Yv: ${this.yVelocity}`;
        document.querySelector("#score").innerText = `S: ${this.length}`;
        document.querySelector("#speed").innerText = `R: ${this.speed}`;
        if (this.length > 0) {
            document.querySelector("#tail").innerText =
                `Xt: ${this.tail[this.tail.length - 1].x} | ` +
                `Yt: ${this.tail[this.tail.length - 1].y}`;
        }
    }
}

class Food extends Cell {
    constructor(grid, x = 0, y = 0) {
        super(grid, x, y);
    }

    draw() {
        let width = this.grid.cellDimension[0];
        let height = this.grid.cellDimension[1];
        this.grid.context.fillStyle = "rgb(0, 250, 0)";
        this.grid.context.fillRect(
            this.x * width,
            this.y * height,
            width,
            height
        );
    }

    detectCollision(cell) {
        if (this.x === cell.x && this.y == cell.y) {
            this.coordinate = [
                Math.floor(Math.random() * this.grid.columns),
                Math.floor(Math.random() * this.grid.rows)
            ];
            cell.length++;
            return true;
        }
        return false;
    }

    debug() {
        document.querySelector("#food").innerText = `Xf: ${this.x} | Yf: ${this.y}`;
    }
}
