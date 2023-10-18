const canvasSize = 800;
const gridSize = new vec2(1,3);
const cellSize = 300;
let hexgrid;
let sideLength;
const maxdepth = 4;
const midpointVariance = 1;
// const splitChance = 0.5;
let sideOffset;

let yPos = 0;
let xPos = 0;

const colors = ["e63946","f1faee","a8dadc","457b9d","1d3557"]

function setup() {
	createCanvas(canvasSize, canvasSize, SVG);
	noFill();
	grid = new HexGrid(new vec2(0, 0), gridSize, cellSize);
	sideLength = cellSize * 0.5;
	sideOffset = new vec2(sideLength/2, grid.cellSize.y/2);
	noLoop();
}

function draw() {
	clear();
	background(255);
	translate(375, 250);
	fill(100);
	stroke(255);
	noFill();
	stroke(0);
	noLoop();
	grid.iterate(drawCell);
	save("mySVG.svg");
}

function drawCell(c) {
	push();
		translate(c.worldCoords.x, c.worldCoords.y);
		yPos = c.worldCoords.y;
		xPos = c.worldCoords.x;
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
	let splitChance = (1 - (abs((canvasSize * 0.5) - xPos) / canvasSize)) * (1 - (abs((canvasSize * 0.5) - yPos) / canvasSize)) * 0.7;
	console.log(splitChance);
	if (depth >= maxdepth || (Math.random() > splitChance)) {
		let color = "#" + randomChoice(colors);
		// fill(color);
		// stroke(color);
		triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
	} else {
		// given a triangle with the point up at v1, go clockwise and then do the center
		subdiv(v1, v1.midpoint(v3, midpointVariance), v1.midpoint(v2, midpointVariance), depth+1);
		subdiv(v2, v2.midpoint(v1, midpointVariance), v2.midpoint(v3, midpointVariance), depth+1);
		subdiv(v3, v3.midpoint(v2, midpointVariance), v3.midpoint(v1, midpointVariance), depth+1);
		subdiv(v1.midpoint(v2, midpointVariance), v2.midpoint(v3, midpointVariance), v3.midpoint(v1, midpointVariance), depth+1);
	}
}
