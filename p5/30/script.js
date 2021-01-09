var canvasDiameter = 800;

var bg = "#f6f6f4";
var fg = "#4169ff";

var rowBuffer = [];
var mazeWidth = 400;
var mazeHeight = 100;
var cellSize = 10;
var lineWeight = 2;
var currentRow = [];

var rowLength = mazeWidth/cellSize;

class Cell {
    constructor() {
        this.right = false;
        this.bottom = false;

        this.set = null;
    }
}

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
    strokeCap(PROJECT);
    noFill();
    strokeWeight(lineWeight);
    rectMode(CENTER);
    addRow();
    setInterval(addRow, 100);
}

function addRow() {
    if (rowBuffer.length == 0) {
        // 1. create the first row, no cells are members of any set
        for (let x=0; x<rowLength; x++) {
            var c = new Cell();
            currentRow.push(c);
        }
    }

    // 2. join any cells not members of a set to their own unique set
    for (let i=0; i<currentRow.length; i++) {
        if (currentRow[i].set == null) {
            currentRow[i].set = new Set();
            currentRow[i].set.add(currentRow[i]);
        }
    }
    
    // 3. create right walls, moving from left to right
    for (let i=0; i<currentRow.length-1; i++) {
        // if the current cell and the cell to the right are members 
        // of the same set, create a wall between them
        if ((currentRow[i].set === currentRow[i+1].set) || randomBool()) {
            currentRow[i].right = true;
        } else {
        // if no wall, union the sets
            currentRow[i].set.union(currentRow[i+1].set);
        }
    }

    // 4. create bottom walls, moving from left to right
    for (let i=0; i<currentRow.length; i++) {
        // if the cell is the only one in its set, don't make a bottom wall
        // if the cell is the only member of its set without a bottom wall, don't make a bottom wall
        // if not, randomly add a bottom wall
        if (
            currentRow[i].set.size > 0
            && !(!currentRow[i].bottom && (notBottomCount(currentRow[i].set) == 1))
            && randomBool()
            ) {
                currentRow[i].bottom = true;
            }
    }

    outputRow(currentRow);

    // remove all right walls
    for (let i=0; i<currentRow.length-1; i++) {
        currentRow[i].right = false;
    }
    //remove all cells with a bottom wall from their set
    for (let i=0; i<currentRow.length; i++) {
        if (currentRow[i].bottom) {
            currentRow[i].set.delete(currentRow[i]);
            currentRow[i].set = null;
        }
    }
    // remove all bottom walls
    for (let i=0; i<currentRow.length; i++) {
        currentRow[i].bottom = false;
    }
}

function outputRow(row) {
    // clone the object
    rowBuffer.push(JSON.parse(JSON.stringify(row)));
    if (rowBuffer.length > (mazeHeight/cellSize)) {
        rowBuffer.shift();
    }
}

function drawRows() {
    translate(canvasDiameter/2 - mazeWidth/2, canvasDiameter/2 - mazeHeight/2);
    for (let i=0; i<rowBuffer.length; i++) {
        push();
            translate(0, i*cellSize);
            let currentRow = rowBuffer[i];
            for (let j=0; j<currentRow.length; j++) {
                let currentCell = currentRow[j];
                push();
                    translate(j*cellSize, 0);
                    if (currentCell.bottom) {
                        line(0, cellSize, cellSize, cellSize);
                    }
                    if (currentCell.right) {
                        line(cellSize, 0, cellSize, cellSize);
                    }
                pop();
            }
        pop();
    }
}

function draw() {
    background(bg);
    stroke(fg) 
    rect(400, 400, mazeWidth, mazeHeight);

    push();
        drawRows();
    pop();
}

// yeah
function notBottomCount(s) {
    var c = 0;
    s.forEach(function(x) {
        if (!x.bottom) c++;
    });
    return c;
}

Set.prototype.union = function(setB) {
    for (let elem of setB) {
        elem.set = this;
        this.add(elem)
    }
}
