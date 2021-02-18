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