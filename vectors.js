class Point {

    _x = undefined;
    _y = undefined;

    /*
     * Instantiated with: (), (x, y), ([x, y],{x:, y:})
     *
     */
    constructor(arg0, arg1) {
        if (!arguments.length) {
            // create point(0, 0)
            this._x = 0;
            this._y = 0;
        } else if (arguments.length == 1) {
            // can be array or object
            if (Array.isArray(arg0)) {
                // if array
                if (arg0.length == 2) {
                    this._x = arg0[0];
                    this._y = arg0[1];
                } else throw new TypeError(`Cannot construct Point from array containing ${arg0.length} elements`);
            } else if (arg0.hasOwnProperty('x') && arg0.hasOwnProperty('y')) {
                // if object
                this._x = arg0.x;
                this._y = arg0.y;
            } else throw new TypeError(`No x and y properties in instantiation argument`);
        } else if (arguments.length == 2) {
            // if basic x, y
            if (typeof arg0 === 'number' && typeof arg1 === 'number') {
                this._x = arg0;
                this._y = arg1;
            } else throw new TypeError(`Point coordinates must be numbers`);
        } else throw new TypeError(`Wrong number of arguments for Point constructor`);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    static isPoint(object) {
        return object instanceof Point;
    }

    toString() {
        return `Point(${this._x}, ${this._y})`;
    }
}


class Line {

    _start = undefined;
    _end = undefined;
    _style = undefined;

    /*
     * Instantiated with: (x0, y0, x1, y1), [x0, y0, x1, y1], (Point(x0, y0), Point(x1, y1))
     *
     */
    constructor(arg0, arg1, arg2, arg3) {
        if (arguments.length == 1) {
            // from array[4]
            if (Array.isArray(arg0)) {
                if (arg0.length != 4) throw new TypeError('Wrong number of items in instantiaton array');
                this._start = new Point(arg0[0], arg0[1]);
                this._end = new Point(arg0[2], arg0[3]);
            } else throw new TypeError('Constructor argument must be an array[4]');
        } else if (arguments.length == 2) {
            // from 2 points
            if(Point.isPoint(arg0) && Point.isPoint(arg1)) {
                this._start = arg0;
                this._end = arg1;
            } else throw new TypeError('Arguments are not valid Points');
        } else if (arguments.length == 4) {
            this._start = new Point(arg0, arg1);
            this._end = new Point(arg2, arg3);
        } else throw new ReferenceError(`Bad number of arguments for Line constructor`);

        // default to black
        this._style = '#000000';
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = this._style;
        ctx.stroke();
    }

    get coords() {
        return {start: this._start, end: this._end};
    }

    get start() {
        return this._start;
    }

    set start(point) {
        if (!Point.isPoint(point)) throw new TypeError('Argument for start must be a valid Point');
        this._start = point;
    }

    get end() {
        return this._end;
    }

    set end(point) {
        if (!Point.isPoint(point)) throw new TypeError('Argument for end must be a valid Point');
        this._end = point;
    }

    get style() {
        return this._style;
    }

    set style(value) {
        this._style = value;
    }

    static isLine(object) {
        return object instanceof Line;
    }
}


class Vector {

    _point = undefined;

    /*
     * Instantiated with (), (x, y), (Point(x,y))
     *
     */
    constructor(arg0, arg1) {
        if (!arguments.length) {
            // default
            this._point = new Point(0, 0);
        } else if (arguments.length == 1) {
            // from point
            if (!Point.isPoint(arg0)) throw new TypeError(`Argument is not a valid Point: ${arg0}`);
            this._point = arg0;
        } else if (arguments.length == 2) {
            // from x, y
            this._point = new Point(arg0, arg1);
        }
    }

    resolve() {
        let u = new Vector(new Point(this.x, 0));
        let v = new Vector(new Point(0, this.y));
        return {u, v};
    }

    get coords() {
        return this._point;
    }

    get x() {
        return this._point.x;
    }

    set x(number) {
        this._point.x = number;
    }

    get y() {
        return this._point.y;
    }

    set y(number) {
        this._point.y = number;
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    get slope() {
        return Math.atan2(this.y, this.x);
    }

    multiply(argument) {
        if (argument instanceof Vector) {
            return this._multiplyByVector(argument);
        } else {
            return this._multiplyByScalar(argument);
        }
    }

    _multiplyByScalar(number) {
        this._point.x *= number;
        this._point.y *= number;
    }

    _multiplyByVector(vector) {

    }
}


class Canvas {
    constructor(id) {
        this._canvas = document.getElementById(id);
        if (!this._canvas) throw new ReferenceError(`No canvas with ID ${id} found.`);

        this._context = this._canvas.getContext('2d');
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }
}

function init() {
    line = new Line(new Point(0, 0), new Point(200, 500));
}

function update(timestamp) {
    line.draw(canvas._context);
}

function animate(timestamp) {
    requestAnimationFrame(animate);
    update(timestamp);

}

let canvas = new Canvas('app-canvas');

init();
animate();

// ------------ Tests

