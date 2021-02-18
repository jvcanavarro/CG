class Curve {
    constructor(coords) {
        this.startingPoint = coords[0];
        this.points = Array.from(coords);
    }

    computePoint(t){
        var n = this.points.length - 1;
        for (var r = 1; r <= n; r++) {
            for (var i = 0; i <= n - r; i++) {
                this.points[i] = this.sum(
                    this.dot(this.points[i], (1 - t)),
                    this.dot(this.points[i + 1], t)
                );
            }
        }
        return this.points[0];
    }

    drawCurve() {
        for (var t = 0; t <= 1; t += 0.15) {
            var points = [];
            var finalPoint = this.computePoint(t);

            points.push([this.startingPoint[0], this.startingPoint[1]])
            points.push([finalPoint[0], finalPoint[1]]);

            var bres = new Bresenham(points);
            bres.drawLine();
            this.startingPoint = finalPoint;
        }
    }

    dot(point, t) {
        var result = []
        result[0] = Math.round(point[0] * t);
        result[1] = Math.round(point[1] * t);
        return result
    }

    sum (p1, p2) {
        var result = []
        result[0] = p1[0] + p2[0];
        result[1] = p1[1] + p2[1];
        return result;
    }
}