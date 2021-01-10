class Bresenham {
    constructor (coords) {
        this.x0 = coords[0][0];
        this.y0 = coords[0][1];
        this.x1 = coords[1][0];
        this.y1 = coords[1][1];
    }

    drawLine () {
        var dx = Math.abs(this.x1 - this.x0);
        var dy = Math.abs(this.y1 - this.y0);
        var sx = (this.x0 < this.x1) ? 1 : -1;
        var sy = (this.y0 < this.y1) ? 1 : -1;
        var err = dx - dy;
        
        while(true) {
            setPixel(this.x0, this.y0);
        
            if ((this.x0 === x1) && (this.y0 === y1)) break;
            var e2 = 2*err;
            
            if (e2 > -dy) { 
                err -= dy; 
                x0  += sx; }
            
            if (e2 < dx) { 
                err += dx; 
                y0  += sy; }
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
    for (var i = 0; i < 30; i++) {
        x[i] = w + i * w;
        y[i] = w + i * w;
    }

    for (var i = 0; i < 900; i++) {
        color[i] = true;
    }

    bres_button = createButton('Bresenham');
    bres_button.position(1000, 19);
    bres_button.mousePressed(startBresenham);
}

function startBresenham(){
    bresenham = new Bresenham(coords);
    bresenham.drawLine();
}

function draw() {
    background(255);
    rectMode(CENTER);
    stroke(0);
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < 30; j++) {
            if (color[i * 30 + j]) fill("white");
            else fill("pink");
            rect(x[j], y[i], w, w);
        }
    }
}
function mousePressed() {
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            var dis = dist(mouseX, mouseY, x[j], y[i]);
            if (dis < w/2){
                color[i * 30 + j] =! color[i * 30 + j];
                coords.push([i, j]);
            }
        }
    }
}

