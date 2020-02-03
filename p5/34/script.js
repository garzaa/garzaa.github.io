var canvasSize = 800;

var bg = 220;
var fg = 50;

var cellSize = 16;
var lineWeight = 3;
var workingArea = 512;
var cellCount = workingArea/cellSize;
var margin = (canvasSize-workingArea)/2;

class Cell {
    constructor(x, y) {
        this.top = false;
        this.bottom = false;
        this.left = false;
        this.right = false;
        
        // write only for equality comparison
        this.x = x;
        this.y = y;

        this.parentSet = null;
    }
}

var rows = []

function makeRows(rows) {
    var currentRow = []
    for (var q=0; q<cellCount; q++) {
        var y = rows.length;
        // 1. create the first row, no cells are members of any set
        if (rows.length == 0) {
            console.log("creating the first row");
            for (var x=0; x<cellCount; x++) {
                var c = new Cell(x, y);
                currentRow.push(c);
            }
        }

        // 2. join any cells not members of a set to their own unique set
        console.log("making unique sets for lone cells");
        for (var i=0; i<currentRow.length; i++) {
            if (currentRow[i].parentSet == null) {
                currentRow[i].parentSet = new Set();
                currentRow[i].parentSet.add(currentRow[i]);
            }
        }

        // 3. create right walls, moving from left to right
        console.log("creating right walls")
        for (var i=0; i<currentRow.length-1; i++) {
            // if the current cell and the cell to the right
            // are members of the same set, always create a wall between them
            // if not, randomly add right walls
            if (
                (currentRow[i].parentSet === currentRow[i+1].parentSet) || randomBool()
                ) {
                currentRow[i].right = true;
            } else {
                // if no wall, union the sets
                currentRow[i].parentSet.union(currentRow[i+1].parentSet);
            }
        }

        // 4. create bottom walls, moving from left to right
        console.log("creating bottom rows");
        for (var i=0; i<currentRow.length; i++) {
            // if the cell is the only one in its set, don't make a bottom wall
            // if the cell is the only member of its set without a bottom wall, don't make a bottom wall
            // if not, randomly add a bottom wall
            if (
                currentRow[i].parentSet.size > 0
                && !(!currentRow[i].bottom && (notBottomCount(currentRow[i].parentSet) == 1))
                && randomBool()
                ) {
                    currentRow[i].bottom = true;
                }
        }

        //5. if it's the last row
        if (rows.length == cellCount-1) {
            // add a bottom wall to every cell
            print("done, cleaning up");

            // if current cell and cell to right are different sets
            for (var i=0; i<currentRow.length-1; i++) {
                if (currentRow[i].parentSet != currentRow[i+1].parentSet) {
                    // remove the right wall
                    currentRow[i].right = false;
                    currentRow[i+1].left = false;
                    // union sets
                    currentRow[i].parentSet.union(currentRow[i+1].parentSet);
                }
            }
            // then output
            output(currentRow);
        } else {
            // output the current row
            output(currentRow);

            print("cleaning up current row");
            // remove all right walls
            for (var i=0; i<currentRow.length-1; i++) {
                currentRow[i].right = false;
            }
            //remove all cells with a bottom wall from their set
            for (var i=0; i<currentRow.length; i++) {
                if (currentRow[i].bottom) {
                    currentRow[i].parentSet.delete(currentRow[i]);
                    currentRow[i].parentSet = null;
                }
            }
            // remove all bottom walls
            for (var i=0; i<currentRow.length; i++) {
                currentRow[i].bottom = false;
            }
        }
        console.log(currentRow);
    }

    // finally add the walls on the top and sides
    console.log("done, cleaning up");
    for (var i=0; i<rows.length; i++) {
        for (var j=0; j<rows[i].length; j++) {
            if (i == 0) {
                rows[i][j].top = true;
            } else if (i == rows.length-1) {
                rows[i][j].bottom = true;
            }

            if (j == 0) {
                rows[i][j].left = true;
            } else if (j == rows[i].length-1) {
                rows[i][j].right = true;
            }
        }
    }

    rows[0][0].top = false;
    rows[rows.length-1][rows[0].length-1].bottom = false;
}

// copy and output
function output(row) {
    rows.push(JSON.parse(JSON.stringify(row)));
    // then move y down
    for (var i=0; i<row.length; i++) {
        row[i].y += 1;
    }
}

function drawCell(cell, x, y) {
    push();
        translate(x * cellSize, y * cellSize);
        if (cell.top) line(0, 0, cellSize, 0)
        if (cell.right) line(cellSize, 0, cellSize, cellSize);
        if (cell.bottom) line(cellSize, cellSize, 0, cellSize);
        if (cell.left) line(0, cellSize, 0, 0);
    pop();
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    noLoop();
    strokeCap(PROJECT)
    strokeWeight(lineWeight);
    noFill();
    background(bg);
    stroke(fg);

    // create the rows
    makeRows(rows);
}

function draw() {
    background(bg);
    push();
    translate(margin, margin);
    for (var i=0; i<rows.length; i++) {
        for (var j=0; j<rows[i].length; j++) {
            drawCell(rows[i][j], j, i);
        }
    }
    pop();
}

Set.prototype.union = function(setB) {
    for (let elem of setB) {
        elem.parentSet = this;
        this.add(elem)
    }
}

// yeah
function notBottomCount(s) {
    var c = 0;
    s.forEach(function(x) {
        if (!x.bottom) c++;
    });
    return c;
}