// also includes ../utils.js

var canvasDiameter = 800;

var bg = "#E9B44C";
var fg = "#44355B";
var hi = "#EE5622";
var pointRadius = 200;
var subgridDensity = 11;
var subgridSize = 300;
var numArcs = 7;
var arcVariance = 1;
var radiusVariance = 3;
var defaultRadius = 4;
var maxSegments = 9;
var noiseIncrement = 0.005;
var arcLengths = [
    Math.PI/2,
    Math.PI,
    Math.PI,
    Math.PI + Math.PI/2,
    Math.PI * 2
];
var subPoints;

var points = new PointGrid(pointRadius, pointRadius * 2, canvasDiameter, canvasDiameter);
var arcs = [];

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
    background(bg);
    fill(fg);
    noStroke();
    initialDraw();
}

function draw() {
    background(bg);
    redrawSubgrid();
    arcs.forEach(a => a.draw());
}
    

function initialDraw() {
    background(bg);
    points.iterateOnPoints(function(p) {
        makeLines(p.x, p.y);
    });
}

function makeLines(x, y) {
    subPoints = new PointGrid(
        0,
        subgridSize/subgridDensity,
        subgridSize,
        subgridSize,
        createVector(x-(subgridSize/2), y-(subgridSize/2))
    );
    arcs = makeArcs(subPoints);
    // makeLineCluster(subPoints);
}

function redrawSubgrid() {
    subPoints.iterateOnPoints(drawSubPoint);
}

function drawSubPoint(p) {
    ellipse(p.x, p.y, 3, 3);
}

function makeArcs(subPoints) {
    let tempArcs = [];
    rangeIter(numArcs + randomPlusOrMinus(arcVariance), function() {
        var p = subPoints.getEmptyPoint();
        subPoints.occupy(p.x, p.y);
        tempArcs.push(new Arc(subPoints.getPosition(p)));
    })
    return tempArcs;
}

class Arc {
    constructor(
        position
    ) {
        this.position = position;
        this.length = randomChoice(arcLengths);
        this.rotation = randomChoice(arcLengths);
        this.radius = (defaultRadius + randomPlusOrMinus(radiusVariance)) * (subgridSize/subgridDensity);
        this.xoff = randomInt(100);
    }

    draw() {
        push();
            stroke(hi);
            strokeWeight(5);
            strokeCap(ROUND);
            strokeJoin(ROUND);
            noFill();
            this.xoff += noiseIncrement;
            translate(this.position.x, this.position.y);
            rotate(noise(this.xoff) * 2);
            arc(0, 0, this.radius, this.radius, this.rotation, this.rotation + this.length);
        pop();
    }
}
