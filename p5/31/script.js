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

var points = pointGrid(pointRadius, pointRadius * 2, canvasDiameter, canvasDiameter);

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
    background(bg);
    fill(fg);
    noStroke();
    frameRate(1);
    initialDraw();
}

function draw() {
    redrawPoint(randomChoice(randomChoice(points)));
}
    

function initialDraw() {
    background(bg);
    iterateOnPoints(points, function(p) {
        makeLines(p.x, p.y);
    })
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
    var subPoints = pointGrid(
        0,
        subgridSize/subgridDensity,
        subgridSize,
        subgridSize,
        createVector(x-(subgridSize/2), y-(subgridSize/2))
    );
    iterateOnPoints(subPoints, drawSubgrid);
    makeLineCluster(subPoints);
}

function drawSubgrid(p) {
    ellipse(p.x, p.y, 1, 1);
}

// return an int in the range (-lineVariance, lineVariance))
function getRandomLineVariance() {
    return numLines + Math.round(-lineVariance + (Math.random() * lineVariance * 2));
}

function makeLineCluster(pointGrid) {
    push();
        strokeWeight(4);
        stroke(hi);
        strokeCap(ROUND);
        strokeJoin(ROUND);

        var occupiedPoints = [];
        rangeIter(pointGrid.length, function() {
            var row = [];
            rangeIter(pointGrid[0].length, x => row.push(false));
            occupiedPoints.push(row);
        });

        var numLines = getRandomLineVariance();
        for (var i=0; i<numLines; i++) {
            var currLine = [];
            // this is a reference, NOT a value
            var currPoint = getEmptyPoint(pointGrid, occupiedPoints);
            if (currPoint != null) {
                currLine.push(currPoint);
                for (var j=0; j<maxSegments; j++) {
                    if (currPoint != null) {
                        currPoint = getRandomDirection(pointGrid, occupiedPoints, currPoint.x, currPoint.y);
                    }
                    if (currPoint != null) {
                        currLine.push(currPoint);
                    }
                }

                if (currLine.length > 1) {
                    for (var k=0; k<currLine.length-1; k++) {
                        var refPt = currLine[k];
                        var refPtNext = currLine[k+1];
                        var currPoint = pointGrid[refPt.y][refPt.x];
                        var nextPoint = pointGrid[refPtNext.y][refPtNext.x];
                        line(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);
                    }
                }
            }
        }
    pop();
}

function getRandomDirection(pointGrid, occupiedPoints, xIndex, yIndex) {
    var options = [];
    var xSize = pointGrid[0].length-1;
    var ySize = pointGrid.length-1;
    occupiedPoints[xIndex][yIndex] = true;
    // only move in cardinal directions
    if (xIndex > 0 && !isOccupied(xIndex-1, yIndex, occupiedPoints)) {
        options.push(createVector(xIndex-1, yIndex));
    }
    if (xIndex < xSize && !isOccupied(xIndex+1, yIndex, occupiedPoints)) {
        options.push(createVector(xIndex+1, yIndex));
    }
    if (yIndex > 0 && !isOccupied(xIndex, yIndex-1, occupiedPoints)) {
        options.push(createVector(xIndex, yIndex-1));
    }
    if (yIndex < ySize && !isOccupied(xIndex, yIndex+1, occupiedPoints)) {
        options.push(createVector(xIndex, yIndex+1));
    }
    if (options.length == 0) {
        return null;
    }
    var choice = randomChoice(options);
    occupiedPoints[choice.x][choice.y] = true;
    return choice;
}

function isOccupied(x, y, occupiedPoints) {
    return occupiedPoints[x][y] === true;
}

function getEmptyPoint(pointGrid, occupiedPoints) {
    var visitedY = [];
    while (visitedY.length < pointGrid.length) {
        var tempY = randomInt(pointGrid.length);
        if (visitedY.includes(tempY)) {
            continue;
        }
        visitedY.push(tempY);
        var visitedX = [];
        while (visitedX.length < pointGrid[tempY].length) {
            var tempX = randomInt(pointGrid[tempY].length);
            if (visitedX.includes(tempX) || occupiedPoints[tempX][tempY] === true) {
                visitedX.push(tempX);
                continue;
            }
            occupiedPoints[tempX][tempY] = true;
            return createVector(tempX, tempY);
        }
    }

    return null;
}