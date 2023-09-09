const canvasSize = 900;
const gridSize = new vec2(4,12);
const cellSize = 400;
let hexgrid;
let sideLength;
const maxdepth = 2;
const midpointVariance = 2;
const splitChance = 0.9;

const colors = ["0081a7","00afb9","fdfcdc","fed9b7","f07167"]

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
	fill(100);
	stroke(255);
}

function drawCell(c) {
	push();
		translate(c.worldCoords.x, c.worldCoords.y);
		for (let i=0; i<6; i++) {
			push();
				rotate(i * TWO_PI/6);
				subdiv(
					new vec2(0, 0),
					new vec2(-sideLength/2, grid.cellSize.y/2),
					new vec2(sideLength/2, grid.cellSize.y/2),
					0
				);
			pop();
		}
	pop();
}

function subdiv(v1, v2, v3, depth) {
	// if 50/50 and depth < max then subdivide
	// otherwise fill with a random weighted color
	if (depth >= maxdepth || (Math.random() > splitChance )) {
		let color = "#" + randomChoice(colors);
		fill(color);
		stroke(color);
		triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
	} else {
		// given a triangle with the point up at v1, go clockwise and then do the center
		subdiv(v1, v1.midpoint(v3, midpointVariance), v1.midpoint(v2, midpointVariance), depth+1);
		subdiv(v2, v2.midpoint(v1, midpointVariance), v2.midpoint(v3, midpointVariance), depth+1);
		subdiv(v3, v3.midpoint(v2, midpointVariance), v3.midpoint(v1, midpointVariance), depth+1);
		subdiv(v1.midpoint(v2, midpointVariance), v2.midpoint(v3, midpointVariance), v3.midpoint(v1, midpointVariance), depth+1);
	}
}
