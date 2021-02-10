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
        
        paint(this.x1, this.y1);
        while(true) {
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
            paint(this.x0, this.y0);
        }
    }
}

class Circle {
    constructor (coords, radius) {
        this.x0 = coords[0][0];
        this.y0 = coords[0][1];
        this.p = 3 - (2 * radius);
        this.x = 0;
        this.y = radius;
        color[this.x0 * w + this.y0] = true
    }

    drawCircle() {
        this.paintPixel(this.x0, this.y0, this.x, this.y);

        while (this.x < this.y)
        {
            this.x++;
            if (this.p < 0)
            {
                this.p += (4 * this.x) + 6;
            }
            else
            {
                this.y--;
                this.p += 4 * (this.x - this.y) + 10;
            }
            this.paintPixel(this.x0, this.y0, this.x, this.y);
        }
    }

    paintPixel(xc, yc, x, y) {
        paint(xc + x, yc + y); 
        paint(xc - x, yc + y); 
        paint(xc + x, yc - y); 
        paint(xc - x, yc - y); 

        paint(xc + y, yc + x); 
        paint(xc - y, yc + x); 
        paint(xc + y, yc - x); 
        paint(xc - y, yc - x); 
    }
}

function paint(x, y) {
    if (color[x * w + y])
        color[x * w + y] = false;
}

var x = [];
var y = [];
var color = [];
var w = 30;

var start = [];
var end = [];
let coords = [];


function setup() {
    createCanvas(1500, 1000);

    for (var i = 0; i < w; i++) {
        x[i] = w + i * w;
        y[i] = w + i * w;
    }
    
    clearGrid();

    // Refactor
    bres_button = createButton('Bresenham');
    bres_button.position(1000, 20);
    bres_button.mousePressed(startBresenham);

    circle_title = createElement('h4', 'Circle');
    circle_title.position(1000, 40);
    circle_subtext = createElement('h5', 'Radius');
    circle_subtext.position(1000, 60);
    circle_input = createInput();
    circle_input.position(1000, 100);
    circle_input.size(70);
    circle_button = createButton('Draw');
    circle_button.position(1080, 100);
    circle_button.mousePressed(startCircle);
    
    clear_button = createButton('Clear');
    clear_button.position(1000, 800);
    clear_button.mousePressed(clearGrid);
}

function startBresenham() {
    bresenham = new Bresenham(coords);
    bresenham.drawLine();
}

function startCircle(radius) {
    radius = circle_input.value()
    circle = new Circle(coords, parseInt(radius, 10));
    circle.drawCircle();
}

// Grid might become a class
function clearGrid() {
    for (var i = 0; i < w**2; i++) {
        color[i] = true;
    }
    coords = []
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