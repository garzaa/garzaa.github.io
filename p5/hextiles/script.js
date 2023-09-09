const canvasSize = 900;
const gridSize = new vec2(10, 30);
const cellSize = 100;
let hexgrid;
let sideLength;

const colors = [
	"#ffffff",
	"#ffffff",
	"#ffffff",
	"#353535",
	"#d9d9d9",
	"#3c6e71",
	"#3c6e71",
	"#284b63"
];

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
				let color = randomChoice(colors);
				fill(color);
				stroke(color);
				rotate(i * TWO_PI/6);
				triangle(0, 0, -sideLength/2, grid.cellSize.y/2, sideLength/2, grid.cellSize.y/2)
			pop();
		}
		stroke("#00ffff");
		noFill();
		polygon(0, 0, cellSize/2, 6);
	pop();
}
