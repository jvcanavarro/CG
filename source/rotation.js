class Rotation {
    constructor(coords, angle, pivot) {
        radians = angle * Math.PI / 180;
        this.matrix = [[Math.cos(radians), -Math.sin(radians), 0], 
                       [Math.sin(radians), Math.cos(radians), 0], 
                       [0, 0, 1]];
        this.pivot = pivot;
        this.initialPoints = coords;

        for(var i = 0; i < this.initialPoints.length; i++) {
            this.initialPoints[i][0] = this.initialPoints[i][0] - this.pivot[0];
            this.initialPoints[i][1] = this.initialPoints[i][1] - this.pivot[1];
        }
    }

    compute(point) {
        var result = [0, 0, 1];
        var vector = [point[0], point[1], 1];
        var _pivot = [this.pivot[0], this.pivot[1], 1];

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                result[i] += this.matrix[i][j] * vector[j];
            }
            result[i] += _pivot[i];
        }
        
        var finalPoint = [Math.round(result[0]), Math.round(result[1])];
        return finalPoint
    }

    applyRotation() {
        var finalPoints = [];
        
        for(var i = 0; i < this.initialPoints.length; i++) {
            var rotatedPoint = this.compute(this.initialPoints[i])
            finalPoints.push(rotatedPoint);
        }
        var points = []
        clearGrid();

        for(var j = 0; j < finalPoints.length - 1; j++) {
            points.push(finalPoints[j], finalPoints[j+1]); 
            var bres = new Bresenham(points);
            bres.drawLine()
            points = [];
        } 
    }
}