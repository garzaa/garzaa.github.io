const canvasSize = {
	x: 600,
	y: 600
};

const margin = 75;
const cellSize = 75;
const radius = cellSize/2;

const bgColor = "#44CF6C";
const fillColor = "#A9FDAC";
const hi = "#F1FFE7";

let cellCount = {
	x: Math.floor((canvasSize.x - (2*margin)) / cellSize),
	y: Math.floor((canvasSize.y - (2*margin)) / cellSize)
};

class Cell {
	constructor() {
    self.down = false;
    self.right = false;
  }
}

let grid = [];

function setup() {
	createCanvas(canvasSize.x, canvasSize.y);
	fill(fillColor);
	for (let x=0; x<cellCount.x; x++) {
		let tempRow = [];
		for (let y=0; y<cellCount.y; y++) {
			tempRow.push(new Cell());
		}
		grid.push(tempRow);
	}
	rectMode(RADIUS);
  noLoop();
  noStroke();
}

function drawRandomTriangle(x, y) {
  let rotationSteps = Math.floor(Math.random()*4);
  fill(fillColor);
  if (rotationSteps == 0) {
    triangle(-radius, radius, radius, -radius, radius, radius);
    grid[x][y].down = true;
    grid[x][y].right = true;
  } else if (rotationSteps == 1) {
    // fill ("#ff0000")
    rotate(PI/2 * rotationSteps);
    triangle(-radius, radius, radius, -radius, radius, radius);
    grid[x][y].down = true; 
  } else if (rotationSteps == 2) {
    rotate(PI/2 * rotationSteps);
    triangle(-radius, radius, radius, -radius, radius, radius); 
  } else if (rotationSteps == 3) {
    rotate(PI/2 * rotationSteps);
    triangle(-radius, radius, radius, -radius, radius, radius); 
    grid[x][y].right = true;
  }
}

function draw() {
	background(bgColor);
	translate(margin + cellSize/2, margin + cellSize/2)
	for (let x=0; x<cellCount.x; x++) {
		for (let y=0; y<cellCount.y; y++) {
			let fillType = Math.ceil(Math.random() * 5);
			if (fillType <= 2) {
        rect(x*cellSize, y*cellSize, cellSize/2, cellSize/2);
        grid[x][y].down = true;
        grid[x][y].right = true;
      } else if (fillType <= 4) {
        push();
        translate(x*cellSize, y*cellSize);
        if (Math.random() < -0.1) {
          drawRandomTriangle(x, y);
        } else {
          // if contiguous, match at least one top or left shape
          if (x > 0 && y > 0) {
            let above = grid[x][y-1]; 
            let left = grid[x-1][y];
            if (above.down && left.right) {
              if (Math.random() < 0.1) fill(hi);
              triangle(-radius, -radius, -radius, radius, radius, radius);
            } else {
              // drawRandomTriangle(x, y);
            }
          }
          else if (y > 0) {
            let above = grid[x][y-1];
            if (above.down) {
              let faceRight = Math.random() > 0.5 ? true : false;
              // fill(hi);
              triangle(-radius, -radius, radius, -radius, faceRight ? radius : -radius, radius);
              grid[x][y].right = faceRight;
            } else {
              // drawRandomTriangle(x, y);
            }
          } else if (x > 0) {
            let left = grid[x-1][y];
            if (left.right) {
              let faceDown = Math.random() > 0.5 ? true : false;
              // fill("#0000ff");
              triangle(-radius, radius, -radius, -radius, radius, faceDown ? radius : -radius);
              grid[x][y].down = faceDown;
            } else {
              drawRandomTriangle(x, y);
            }
          }
        }
        pop();
      }
		}	
	}
}
