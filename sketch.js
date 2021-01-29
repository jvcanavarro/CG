class Bresenham {
    constructor (coords) {
        this.x0 = coords[0][0];
        this.y0 = coords[0][1];
        this.x1 = coords[1][0];
        this.y1 = coords[1][1];
    }

    drawLine() {
        var dx = abs(this.x1 - this.x0);
        var sx = this.x0 < this.x1 ? 1 : -1;
        var dy = -abs(this.y1 - this.y0)
        var sy = this.y0 < this.y1 ? 1 : -1;
        var err = dx + dy;
        var i = 0;
        while(true) {
            color[this.x0 * w + this.y0] = !color[this.x0 * w + this.y0];

            if (this.x0 == this.x1 && this.y0 == this.y1)
            break;
            
            var e2 = 2 * err;

            if (e2 >= dy) {
            err += dy;
            this.x0 += sx;
            }
            if (e2 <= dx) {
            err += dx;
            this.y0 += sy;
            }
        }
    }
}

var x = [];
var y = [];
var color = [];
var w = 30;

var start = [];
var end = [];
let coords = [];

var bresenham;

function setup() {
    createCanvas(1500, 980);

    for (var i = 0; i < w; i++) {
        x[i] = w + i * w;
        y[i] = w + i * w;
    }
    
    clearGrid();

    // Refactor
    bres_button = createButton('Bresenham');
    bres_button.position(1000, 20);
    bres_button.mousePressed(startBresenham);

    clear_button = createButton('Clear');
    clear_button.position(1000, 70);
    clear_button.mousePressed(clearGrid);
}

function startBresenham(){
    bresenham = new Bresenham(coords);
    bresenham.drawLine();
}

// Grid might become a class
function clearGrid() {
    for (var i = 0; i < w**2; i++) {
        color[i] = true;
    }
}

function draw() {
    background(255);
    rectMode(CENTER);
    stroke(0);
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < w; j++) {
            if (color[i * w + j]) fill("white");
            else fill("pink");
            rect(x[j], y[i], w, w);
        }
    }
}
function mousePressed() {
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < w; j++) {
            var dis = dist(mouseX, mouseY, x[j], y[i]);
            if (dis < w/2){
                color[i * w + j] = !color[i * w + j];
                coords.push([i, j]);
            }
        }
    }
}