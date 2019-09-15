// also includes ../utils.js

var canvasDiameter = 800;

var bg = "#FAEDCA";
var fg = "#F2C078";
var fg2 = "#C1DBB3";
var hi = "#FE5D26";
var pointRadius = 200;
var subgridDensity = 40;
var subgridSize = 800;
var numLines = 15;
var lineVariance = 1;
var maxSegments = 100;
var fmt = 0.01;
var lines1 = [];
var subPoints1;

function setup() {
    createCanvas(canvasDiameter, canvasDiameter, WEBGL);
    background(bg);
    fill(fg);
    noStroke();
    subPoints1 = blankPointGrid();
    computeAndDrawLinesOnSubpoints(subPoints1);
}

function blankPointGrid() {
    return new PointGrid(
        0,
        subgridSize/subgridDensity,
        subgridSize,
        subgridSize,
        createVector(-canvasDiameter/2, -canvasDiameter/2)
    );
}

function draw() {
    rotateZ(frameCount * fmt);
    rotateX(frameCount * fmt);
    rotateY(frameCount * fmt);
    background(bg);
    push();
        stroke(fg); 
        drawOldLines();
    pop();
    push();
        stroke(fg2);
        rotateY(Math.PI/2);
        drawOldLines();
    pop();
    if (frameCount % 100 == 0) {
        background(bg);
        computeAndDrawLinesOnSubpoints(subPoints1);
    }
}

function drawOldLines() {
    lines1.forEach(line => drawLineOnSubpoints(line, subPoints1));
}

// return an int in the range (-lineVariance, lineVariance))
function getRandomLineVariance() {
    return numLines + Math.round(-lineVariance + (Math.random() * lineVariance * 2));
}

function computeAndDrawLinesOnSubpoints(subPoints) {
    subPoints = blankPointGrid();
    var numLines = getRandomLineVariance();
    lines1 = [];
    for (var i=0; i<numLines; i++) {
        currLine = createLineOnSubpoints(subPoints);
        drawLineOnSubpoints(currLine, subPoints);
        lines1.push(currLine);
    }
}

function createLineOnSubpoints(subPoints) {
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
    }
    return currLine;
}

function drawLineOnSubpoints(currLine, subPoints) {
    push();
        strokeWeight(4);
        if (currLine.length > 1) {
            for (var k=0; k<currLine.length-1; k++) {
                var refPt = currLine[k];
                var refPtNext = currLine[k+1];
                var currPoint = subPoints.points[refPt.y][refPt.x];
                var nextPoint = subPoints.points[refPtNext.y][refPtNext.x];
                line(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);
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