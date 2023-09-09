const canvasSize = 900;
const gridSize = new vec2(3, 7);
const cellSize = 400;
let hexgrid;
let sideLength;

const colors = ["3d348b","7678ed", "7678ed", "7678ed", "7678ed","f7b801","f18701","f35b04"]

function setup() {
	createCanvas(canvasSize, canvasSize);
	noFill();
	grid = new HexGrid(new vec2(0, 0), gridSize, cellSize);
	sideLength = cellSize * 0.5;
	noLoop();
}

function draw() {
	background(50);
	grid.iterate(drawCell);
}

function drawCell(c) {
	push();
		translate(c.worldCoords.x, c.worldCoords.y);
		for (let i=0; i<6; i++) {
				push();
				let color = "#" + randomChoice(colors);
				fill(color);
				stroke(color);
				rotate(i * TWO_PI/6);
				triangle(0, 0, -sideLength/2, grid.cellSize.y/2, sideLength/2, grid.cellSize.y/2)
			pop();
		}
	pop();
}

// TODO: algo for subdividing a triangle
// takes in point coords and current subdivision depth
