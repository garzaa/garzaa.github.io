var canvasSize = 800;

var bg = 220;
var fg = 100;

var cellSize = 16;
var lineWeight = 1;
var workingArea = 1024;
var margin = (canvasSize-workingArea)/2;
var cellCount = workingArea/cellSize;
var cellCutoff = 1;

function exclusiveIntRange(min, max) {
    return intRange(min+1, max-1);
}

function subdivide(bottomLeftCorner, topRightCorner) {
    var xLen = topRightCorner.x - bottomLeftCorner.x;
    var yLen = topRightCorner.y - bottomLeftCorner.y;

    var noGap = intRange(1, 4);
    
    var origin = createVector(
        exclusiveIntRange(bottomLeftCorner.x, topRightCorner.x),
        exclusiveIntRange(bottomLeftCorner.y, topRightCorner.y)
    );

    // terminate the recursion
    if (xLen <= cellCutoff || yLen <= cellCutoff) {
        if (xor(xLen>cellCutoff, yLen>cellCutoff)) {
            noGap = intRange(1, 2);
        }

        if (xLen > cellCutoff) {
            if (noGap != 1) roundedCell(
                exclusiveIntRange(bottomLeftCorner.x, origin.x),
                origin.y
            )
            
            roundedLine(origin.x, origin.y, topRightCorner.x, origin.y);
            if (noGap != 2) roundedCell(
                exclusiveIntRange(origin.x, topRightCorner.x),
                origin.y
            )
        }

        if (yLen > cellCutoff) {
            if (noGap != 1) roundedCell(
                origin.x,
                exclusiveIntRange(origin.y, topRightCorner.y)
            )
    
            roundedLine(origin.x, origin.y, origin.x, bottomLeftCorner.y);
            if (noGap != 2) roundedCell(
                origin.x,
                exclusiveIntRange(bottomLeftCorner.y, origin.y),
            )
        }

        return;
    }

    //origin = createVector(bottomLeftCorner.x+xLen/2, bottomLeftCorner.y+yLen/2);
    
    if (xLen > cellCutoff) {
        roundedLine(bottomLeftCorner.x, origin.y, origin.x, origin.y);
        // top left quadrant
        setTimeout(function() {subdivide(
            createVector(bottomLeftCorner.x, origin.y),
            createVector(origin.x, topRightCorner.y)
        )}, 500);
        // top right quadrant
        setTimeout(function() {subdivide(
            origin,
            topRightCorner
        )}, 500);
    }

    if (yLen > cellCutoff) {
        roundedLine(origin.x, topRightCorner.y, origin.x, origin.y);
        // bottom left quadrant
        setTimeout(function() {subdivide(
            bottomLeftCorner,
            origin
        )}, 500);
        // bottom right quadrant
        setTimeout(function() {subdivide(
            createVector(origin.x, bottomLeftCorner.y),
            createVector(topRightCorner.x, origin.y)
        )}, 500);
    }
}

function roundedLine(x0, y0, x1, y1) {
    line(x0*cellSize, y0*cellSize, x1*cellSize, y1*cellSize);
}

function roundedCell(x, y) {
    // how the hell do you keep the thing from being overwritten
    push();
        noStroke();
        fill(bg);
        rect(x*cellSize, y*cellSize, lineWeight/2, lineWeight/2);
    pop();
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    noFill();
    noLoop();
    strokeWeight(lineWeight);
    strokeCap(PROJECT);
    stroke(fg);
}

function draw() {
    background(bg);
    translate(canvasSize/2, canvasSize/2);
    translate(-workingArea/2, -workingArea/2);
    
    // draw the bounding box
    rect(0, 0, workingArea, workingArea);

    // do the thing
    subdivide(createVector(0, 0), createVector(cellCount, cellCount))
}
