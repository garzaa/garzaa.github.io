const canvasSize = 900;
const gridSize = new vec2(10, 10);
const cellSize = 50;
let hexgrid;

function setup() {
	createCanvas(canvasSize, canvasSize);
	stroke(200);
	noFill();
	hexgrid = new HexGrid(new vec2(100, 100), gridSize, cellSize);
}

function draw() {
	background(50);
	hexgrid.iterate(drawCell);
}

function drawCell(c) {
	polygon(c.worldCoords.x, c.worldCoords.y, cellSize/2, 6);
}
