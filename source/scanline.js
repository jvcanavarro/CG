class Scanline {
    sweep() {
        let points = getTruePoints();
        var ymin = Number.MIN_SAFE_INTEGER;
        var ymax = Number.MAX_SAFE_INTEGER;
        var criticals = [];

        for (var i = 0; i < points.length; i++) {

            if (point[i][1] < ymin) ymin = point[i][1];
            else if (point[i][1] > ymax) ymax = point[i][1];

            // Find critical points
            var aux = points[(i + 1) % points.length];
            if (points[i][0] < aux[1]) {
                criticals.push()
            }
        }
    }
}