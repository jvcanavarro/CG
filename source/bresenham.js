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