class Filler {
    flood(x, y) {
        if (check_color(x, y)) {
            paint(x, y);
            this.flood(x + 1, y);
            this.flood(x, y + 1);
            this.flood(x - 1, y);
            this.flood(x, y - 1);
        }
    }
}