class Polyline {
    drawLines() {
        var points = [];
        var bres;
        for (var i = 0; i < coords.length - 1; i++) {
            points.push(coords[i], coords[i+1]);
            bres = new Bresenham(points);
            bres.drawLine()
            points = [];
        }
    }
}