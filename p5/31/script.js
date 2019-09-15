// also includes ../utils.js

var canvasDiameter = 800;

var bg = 250;
var fg = 50;
var hi = "red";
var pointRadius = 100;
var subgridDensity = 5;
var subgridSize = 80;
var numLines = 3;
var lineVariance = 1;
var maxSegments = 6;

var points = new PointGrid(pointRadius, pointRadius * 2, canvasDiameter, canvasDiameter);

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
    background(bg);
    fill(fg);
    noStroke();
    frameRate(1);
    initialDraw();
}

function draw() {
    redrawPoint(points.randomPoint());
}
    

function initialDraw() {
    background(bg);
    points.iterateOnPoints(function(p) {
        makeLines(p.x, p.y);
    });
}

function redrawPoint(p) {
    push();
        noStroke();
        fill(bg);
        rect(p.x-pointRadius, p.y-pointRadius, pointRadius*2, pointRadius*2);
    pop();
    drawSubgrid(p);
    makeLines(p.x, p.y);
}

function makeLines(x, y) {
    var subPoints = new PointGrid(
        0,
        subgridSize/subgridDensity,
        subgridSize,
        subgridSize,
        createVector(x-(subgridSize/2), y-(subgridSize/2))
    );
    subPoints.iterateOnPoints(drawSubgrid);
    makeLineCluster(subPoints);
}

function drawSubgrid(p) {
    ellipse(p.x, p.y, 1, 1);
}

// return an int in the range (-lineVariance, lineVariance))
function getRandomLineVariance() {
    return numLines + Math.round(-lineVariance + (Math.random() * lineVariance * 2));
}

function makeLineCluster(subPoints) {
    push();
        strokeWeight(4);
        stroke(hi);
        strokeCap(ROUND);
        strokeJoin(ROUND);

        var numLines = getRandomLineVariance();
        for (var i=0; i<numLines; i++) {
            var currLine = [];
            // this is a reference, NOT a value
            var currPoint = subPoints.getEmptyPoint();
            if (currPoint != null) {
                currLine.push(currPoint);
                for (var j=0; j<maxSegments; j++) {
                    if (currPoint != null) {
                        currPoint = getRandomDirection(subPoints, subPoints.occupiedPoints, currPoint.x, currPoint.y);
                    }
                    if (currPoint != null) {
                        currLine.push(currPoint);
                    }
                }

                if (currLine.length > 1) {
                    for (var k=0; k<currLine.length-1; k++) {
                        var refPt = currLine[k];
                        var refPtNext = currLine[k+1];
                        var currPoint = subPoints.points[refPt.y][refPt.x];
                        var nextPoint = subPoints.points[refPtNext.y][refPtNext.x];
                        line(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);
                    }
                }
            }
        }
    pop();
}

function getRandomDirection(pointGrid, occupiedPoints, xIndex, yIndex) {
    var options = [];
    var xSize = pointGrid.points[0].length-1;
    var ySize = pointGrid.points.length-1;
    occupiedPoints[xIndex][yIndex] = true;
    // only move in cardinal directions
    if (xIndex > 0 && !pointGrid.isOccupied(xIndex-1, yIndex)) {
        options.push(createVector(xIndex-1, yIndex));
    }
    if (xIndex < xSize && !pointGrid.isOccupied(xIndex+1, yIndex)) {
        options.push(createVector(xIndex+1, yIndex));
    }
    if (yIndex > 0 && !pointGrid.isOccupied(xIndex, yIndex-1)) {
        options.push(createVector(xIndex, yIndex-1));
    }
    if (yIndex < ySize && !pointGrid.isOccupied(xIndex, yIndex+1)) {
        options.push(createVector(xIndex, yIndex+1));
    }
    if (options.length == 0) {
        return null;
    }
    var choice = randomChoice(options);
    pointGrid.occupiedPoints[choice.x][choice.y] = true;
    return choice;
}
