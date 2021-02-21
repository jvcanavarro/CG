var x = [];
var y = [];
var w = 30;

var start = [];
var end = [];
var color = [];
var coords = [];

const hpos = 1000;

function setup() {
    createCanvas(1500, 1000);

    for (var i = 0; i < w; i++) {
        x[i] = w + i * w;
        y[i] = w + i * w;
    }

    clearGrid();

    // Refactor
    bres_button = createButton('Bresenham');
    bres_button.position(hpos, 20);
    bres_button.mousePressed(startBresenham);

    circle_title = createElement('h4', 'Circle');
    circle_title.position(hpos, 40);
    circle_subtext = createElement('h5', 'Radius');
    circle_subtext.position(hpos, 60);
    circle_input = createInput();
    circle_input.position(hpos, 100);
    circle_input.size(70);
    circle_button = createButton('Draw');
    circle_button.position(hpos + 100, 100);
    circle_button.mousePressed(startCircle);

    poly_button = createButton('Polyline');
    poly_button.position(hpos, 140);
    poly_button.mousePressed(startPolyline);

    fill_button = createButton('Fill');
    fill_button.position(hpos, 170);
    fill_button.mousePressed(startFill);

    curve_button = createButton('Curve');
    curve_button.position(hpos, 200);
    curve_button.mousePressed(startCurve);

    trans_title = createElement('h4', 'Translation');
    trans_title.position(hpos, 230);
    trans_subtext = createElement('h5', 'Tx & Ty');
    trans_subtext.position(hpos, 250);
    trans_xinput = createInput();
    trans_xinput.position(hpos, 290);
    trans_xinput.size(70);
    trans_yinput = createInput();
    trans_yinput.position(hpos + 100, 290);
    trans_yinput.size(70);
    trans_button = createButton('Draw');
    trans_button.position(hpos + 200, 290);
    trans_button.mousePressed(startTranslation);

    scan_button = createButton('Sweep');
    scan_button.position(hpos, 330);
    scan_button.mousePressed(startScanline);


    clear_button = createButton('Clear');
    clear_button.position(1000, 800);
    clear_button.mousePressed(clearGrid);
}

function startBresenham() {
    bresenham = new Bresenham(coords);
    bresenham.drawLine();
}

function startCircle(radius) {
    radius = circle_input.value();
    circle = new Circle(coords, parseInt(radius, 10));
    circle.drawCircle();
}

function startPolyline() {
    poly = new Polyline();
    poly.drawLines();
}

function startFill() {
    starting_point = coords.pop();
    x0 = starting_point[0];
    y0 = starting_point[1];
    filler = new Filler();
    color[x0 * w + y0] = true;
    filler.flood(x0, y0);
}

function startCurve() {
    curve = new Curve(coords);
    curve.drawCurve()
}

function startTranslation() {
    tx = parseInt(trans_xinput.value(), 10);
    ty = parseInt(trans_yinput.value(), 10);
    trans = new Translation(tx, -ty);
    trans.drawTranslation();
}

function startScanline() {
    scan = new Scanline();
    scan.sweep();
}

function draw() {
    background(255);
    rectMode(CENTER);
    stroke(0);
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < w; j++) {
            color[i * w + j] ? fill("white") : fill("pink");
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

function clearGrid() {
    coords = [];
    for (var i = 0; i < w**2; i++) {
        color[i] = true;
    }
}

function getTruePoints() {
    var points = [];
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < w; j++) {
            if (!color[i * w + j])
                points.push([i, j]);
        }
    }
    return points;
}

function paint(x, y) {
    if (color[x * w + y])
        color[x * w + y] = false;
}

function getColor(x, y) {
    return color[x * w + y]
}
