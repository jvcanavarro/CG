class Scanline {
    sweep() {
        let points = getTruePoints();
        var ymax = Number.MIN_SAFE_INTEGER;
        var ymin = Number.MAX_SAFE_INTEGER;
        var criticals = [];

        for (const [i, point] of points.entries()) {
            print('I: ',i);
            if (point[1] < ymin) ymin = point[1];
            else if (point[1] > ymax) ymax = point[1];


            var aux = points[(i + 1) % points.length];
            if (point[1] < aux[1]) {
                criticals.push([i, 1, point[0], (aux[0] - point[0]) / (aux[1] - point[1])]);
            }
            aux = points[(i - 1 + points.length) % points.length];
            if (point[1] < aux[1]) {
                criticals.push([i, -1, point[0], (aux[0] - point[0]) / (aux[1] - point[1])]);
            }
            print('Ymin and Ymax: ',ymin, ymax);
            var active_criticals = [];
            for (var y = ymin; y <= ymax; y++) {
                print('Y :', y);
                for (var j = 0; j < criticals.length; j++) {
                    print('First j:', j);
                    criticals[j][2] += criticals[j][3];
                }
                for (var crit of criticals) {
                    if (points[crit[0]][1] == y)
                        active_criticals.push(crit);
                }
                
                print(active_criticals);
                for (var j = active_criticals.length - 1; j >= 0; j--) {
                    print('Second j: ',j);
                    var pcrit = active_criticals[j];
                    print('Pcrit: ',pcrit);
                    var maxcrit = points[(pcrit[0] + pcrit[1] + points.length) % points.length];

                    if (maxcrit[1] == y)
                        active_criticals.splice(i, 1);
                }

                active_criticals.sort(function(a,b){return a[2] > b[2];});
                print('Active Criticals: ',active_criticals);
                for (var j = 0; j < active_criticals.length; j += 2) {
                    print('Active_critical[j]: ',active_criticals[j]);
                    print('Last j: ', j);
                    var start = Math.round(active_criticals[j][2]);
                    print('Start: ',start);
                    print('Math: ',Math.round(active_criticals[j + 1][2]));
                    var end = Math.round(active_criticals[j + 1][2]);
                    print('End: ',end);

                    for (var x = start; x < end; x++) {
                        print('X: ',x);
                        print('Paint: ', [x, y]);
                        paint(x ,y);
                        // color[x * w + i] ? fill("blue") : fill("pink");
                    } 
                }
            }
        }
    }
}