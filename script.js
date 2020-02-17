var w = window.innerWidth;
var h = window.innerHeight;

var bg = 200;
var fg = 50;

var cellSize = 40;
var lineWeight = 1;
var xMargin = 0;
var yMargin = 0;
var ts = 12;
var xSize = w-(xMargin*2);
var ySize = h-(yMargin*2)+cellSize;
var xCount = Math.round(xSize/cellSize);
var yCount = Math.round(ySize/cellSize);

var N = 1;
var S = 2;
var E = 4;
var W = 8;

var D = {
    N: N,
    S: S,
    E: E,
    W: W
}

var DX = {
    E: 1,
    W: -1,
    S: 0,
    N: 0
}

// p5 js starts at the top left
// more y = going lower
var DY = {
    E: 0,
    W: 0,
    N: -1,
    S: 1
}

var OPPOSITE = {
    E: W,
    W: E,
    N: S,
    S: N
}

function setup() {
	var cnv = createCanvas(w, h);
	cnv.parent("canvas-container");
    noLoop();
    strokeCap(PROJECT)
    strokeWeight(lineWeight);
    noFill();
    background(bg);
    stroke(fg);
    makeRows(rows);
    textSize(ts);
}

var rows = []
rangeIter(yCount, x=>rows.push(new Array(xCount).fill(0)))

function carvePassages(cx, cy, rows) {
    var directions = shuffle(["N", "S", "E", "W"]);

    directions.forEach(function(direction) {
        var nx = cx + DX[direction];
        var ny = cy + DY[direction];

        if ((ny>=0) && (ny<yCount) && (nx>=0) && (nx<xCount) && !rows[ny][nx]) {
            rows[cy][cx] = rows[cy][cx] | D[direction];
            rows[ny][nx] = rows[ny][nx] | OPPOSITE[direction];
            carvePassages(nx, ny, rows);
        }
    });
}

function makeRows(rows) {
    carvePassages(0, 0, rows);
}

function drawCell(cell, i, j) {
    push();
        translate(j*cellSize, i*cellSize);

        if ((j == xCount-1) || !(cell & E))       rightLine();
        if ((j == 0))                             leftLine();
        if (((i == yCount-1) || !(cell & S)))     bottomLine();
        if ((i == 0))                             topLine();

    pop();
}

function leftLine() {
    line(0, cellSize, 0, 0);
}

function rightLine() {
    line(cellSize, 0, cellSize, cellSize);
}

function bottomLine() {
    line(cellSize, cellSize, 0, cellSize);
}

function topLine() {
    line(0, 0, cellSize, 0);
}

function draw() {
    background(bg);
    push();
    translate(xMargin, yMargin);
    for (var i=0; i<rows.length; i++) {
        for (var j=0; j<rows[i].length; j++) {
            drawCell(rows[i][j], i, j);
        }
    }
    pop();
}