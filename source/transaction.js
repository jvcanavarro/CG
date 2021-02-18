class Translation {
    constructor(tx, ty) {
        this.points = getTruePoints();
        this.matrix = [[1, 0, ty], [0, 1, tx], [0, 0, 1]];
    }

    drawTranslation() {
        clearGrid();
        for (var point of this.points) {
            var tpoint = [0, 0, 1];
            var vector = [...point, 1];
            for (var i = 0; i < 3; i++) 
                for (var j = 0; j < 3; j++) 
                    tpoint[i] += this.matrix[i][j] * vector[j];
            paint(tpoint[0], tpoint[1]);
        }
    }
}