const canvasSize = {
	x: 600,
	y: 600
};

const params = {
  margin: 75,
  cellSize: 75,
  hichance: 0.1,
}

let cellCount = {};

class Cell {
	constructor() {
    self.down = false;
    self.right = false;
  }
}

let grid = [];
let radius = 0;

const colors = {
  bgColor: "#44CF6C" ,
  fillColor: "#F1FFE7",
  hi: "#F1FFE7"
};

var gui = new dat.GUI();
gui.addColor(colors, 'bgColor');
gui.addColor(colors, 'fillColor');
gui.addColor(colors, 'hi');

gui.add(params, 'cellSize', 5, 200);
gui.add(params, 'margin', 5, 200);
gui.add(params, 'hichance', 0, 1);

var obj = { redraw:function(){ 
  generate();
  draw();
}};
gui.add(obj, "redraw")

gui.useLocalStorage = true;
gui.remember(params);
gui.remember(colors);

function setup() {
	createCanvas(canvasSize.x, canvasSize.y);
	rectMode(RADIUS);
  noLoop();
  noStroke();
  generate();
}

function generate() {
  cellCount.x = Math.floor((canvasSize.x - (2*params.margin)) / params.cellSize);
  cellCount.y = Math.floor((canvasSize.y - (2*params.margin)) / params.cellSize);
  grid = [];
	for (let x=0; x<cellCount.x; x++) {
		let tempRow = [];
		for (let y=0; y<cellCount.y; y++) {
			tempRow.push(new Cell());
		}
		grid.push(tempRow);
	}
}

function drawRandomTriangle(x, y) {
  let rotationSteps = Math.floor(Math.random()*4);
  fill(colors.fillColor);
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
  push();
  radius = params.cellSize/2;
	background(colors.bgColor);
  fill(colors.fillColor);
	translate(params.margin + params.cellSize/2, params.margin + params.cellSize/2)
	for (let x=0; x<cellCount.x; x++) {
		for (let y=0; y<cellCount.y; y++) {
			let fillType = Math.ceil(Math.random() * 5);
			if (fillType <= 2) {
        rect(x*params.cellSize, y*params.cellSize, params.cellSize/2, params.cellSize/2);
        grid[x][y].down = true;
        grid[x][y].right = true;
      } else if (fillType <= 4) {
        push();
        translate(x*params.cellSize, y*params.cellSize);
        if (Math.random() < -0.1) {
          drawRandomTriangle(x, y);
        } else {
          // if contiguous, match at least one top or left shape
          if (x > 0 && y > 0) {
            let above = grid[x][y-1]; 
            let left = grid[x-1][y];
            if (above.down && left.right) {
              if (Math.random() < params.hichance) fill(colors.hi);
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
  pop();
}
