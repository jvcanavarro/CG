class Display {
    constructor() {
        this.x = [];
        this.y = [];
        this.w = 30;
        this.col = [];
    }
    
    create() {
        for (var i = 0; i < 30; i++) {
            this.x[i] = this.w + i * this.w;
            this.y[i] = this.w + i * this.w;
        }
        for (var i = 0; i < 900; i++) {
            this.col[i] = true;
        }
    }

    draw() {
        for (var j = 0; j < this.y.length; j++) {
            for (var i = 0; i < 30; i++) {
                if (this.col[j * 30 + i]) fill("white");
                else fill("blue");
                rect(this.x[i], this.y[j], this.w, this.w);
            }
        }
    }

    onClick() {
        for (var j = 0; j < 30; j++) {
            for (var i = 0; i < 30; i++) {
                var dis = dist(mouseX, mouseY, this.x[i], this.y[j]);
                if(dis < this.w/2) this.col[j * 30 + i] =! this.col[j * 30 + i];
            }
        }
    }
}