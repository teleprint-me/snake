class Container {
    constructor(id, width = 480, height = 480) {
        this._canvas = document.querySelector(`#${id}`);
        this._canvas.width = width;
        this._canvas.height = height;

        this._context = this._canvas.getContext("2d");
    }

    get canvas() {
        return this._canvas;
    }

    get context() {
        return this._context;
    }

    get width() {
        return this._canvas.height;
    }

    get height() {
        return this._canvas.width;
    }

    get dimension() {
        return [this._canvas.width, this._canvas.height];
    }

    set dimension(size) {
        this._canvas.width = size[0];
        this._canvas.height = size[1];
    }

    debug() {
        document.querySelector("#container").innerHTML = `C: ${this.size}`;
    }
}

class Grid extends Container {
    // width and height affect the number of cells per row and col
    constructor(id, width = 480, height = 480, columns = 32, rows = 32) {
        super(id, width, height);

        this._columns = columns;
        this._rows = rows;

        this._x = 0;
        this._y = 0;
    }

    get origin() {
        return [this._x, this._y];
    }

    get columns() { // how many columns wide?
        return this._columns;
    }

    get rows() { // how many rows high?
        return this._rows;
    }

    get size() { // [columns wide, rows high]
        return [this._columns, this.rows];
    }

    set size(size = [0, 0]) {
        this._rows = size[0];
        this._columns = size[1];
    }

    get cellDimension() {
        return [
            Math.round(this.width / this._columns),
            Math.round(this.height / this._rows)
        ];
    }

    get relativeCellDimension() {
        return [
            Math.round(this.width / this._columns / 2),
            Math.round(this.height / this._rows / 2)
        ];
    }

    draw() {
        this.context.strokeStyle = "rgb(30, 30, 30)";
        this.context.beginPath();
        for (let x = 0; x < this.dimension[0]; x += this.cellDimension[0]) {
            this.context.moveTo(0, x);
            this.context.lineTo(x * this.width, x);
            this.context.lineWidth = 1;
            for (let y = 0; y < this.dimension[1]; y += this.cellDimension[1]) {
                this.context.moveTo(y, 0);
                this.context.lineTo(y, y * this.height);
                this.context.lineWidth = 1;
            }
        }
        this.context.stroke();
    }

    clear() {
        this.context.fillStyle = "rgb(25, 25, 25)";
        this.context.fillRect(0, 0, this.width, this.height);
    }

    debug() {
        document.querySelector("#container").innerText = 
            `D: ${this.dimension} | O: ${this.origin}`;
        document.querySelector("#grid").innerText =
            `C: ${this.columns} | R: ${this.rows} | ` + 
            `Xh: ${ this.cellDimension[0] } | Yh: ${ this.cellDimension[1] }`;
    }
}
