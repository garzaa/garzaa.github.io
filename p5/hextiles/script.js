const canvasSize = 900;
const gridSize = new vec2(40, 50);
const cellSize = 150;
let hexgrid;
let sideLength;
const maxdepth = 5;
const midpointVariance = 1;
const dotChance = 0.1;
// const splitChance = 0.5;
let sideOffset;

let yPos = 0;
let xPos = 0;

const bg = orangeleaf[1];
const lace1 = orangeleaf[2];
const lace2 = orangeleaf[3];
const laces = [lace1, lace2, orangeleaf[4]];

const agletChance = 0.07;
let aglets = [];

function setup() {
	createCanvas(canvasSize, canvasSize);
	noFill();
	grid = new HexGrid(new vec2(0, 0), gridSize, cellSize);
	sideLength = cellSize * 0.5;
	sideOffset = new vec2(sideLength/2, grid.cellSize.y/2);
	noLoop();
}

function draw() {
	background(bg);
	// grid.iterate(drawBorders);
	grid.iterate(drawCell);
	// grid.iterate(drawDots);
	strokeWeight(4);
	
	for (let i=0; i<aglets.length; i++) {
		aglet(aglets[i][0], aglets[i][1], aglets[i][2])
	}
}

function drawBorders(c) {
	stroke("#00ffff");
	strokeWeight(3);
	polygon(c.worldCoords.x, c.worldCoords.y, cellSize/2, 6);
}

function drawCell(c) {
	// get all the points on the perimeter (one on each)
	// draw a bezier line from that point to another random point
	// remove them from the array
	// then keep doing that until it's empty

	let points = getPerimeterPoints(c);
	let a1, a2 = null;
	while (points.length > 0) {
		let v1 = yoink(points);
		let v2 = yoink(points);
		// then draw a bezier between the two
		stroke(randomChoice(laces));
		strokeWeight(20);
		if (Math.random() > agletChance) pointBezier(v1, v2, c.worldCoords);
		else {
			aglets.push([v1, v2, c.worldCoords]);
		}
	}
}

function drawDots(c) {
	for (let i=0; i<6; i++) {
		if (Math.random() < dotChance) {
			a = i/6 * TWO_PI;
			let corner = c.worldCoords.add(new vec2(cos(a), sin(a)).scale(cellSize/4 * sqrt(3)));
			push();
				noStroke();
				fill(randomChoice(pinkbluepastels));
				let r = Math.random() * 15 + 10;
				ellipse(corner.x, corner.y, r);
			pop();
		}
	}
}

function getPerimeterPoints(c) {
	let x = [];
	let a = 0;
	for (let i=0; i<6; i++) {
		a = i/6 * TWO_PI + PI/6;
		// distance to a flat edge
		x.push(
			c.worldCoords.add(
				new vec2(cos(a), sin(a))
				.scale(cellSize/4 * sqrt(3))
		));
	}
	return x;
}

function yoink(a) {
	return a.splice(intRange(0, a.length-1), 1)[0];
}

function pointBezier(p1, p2, center) {
	// bezier between points with midpoint from point and center as control points
	let mp1 = p1.midpoint(center);
	let mp2 = p2.midpoint(center);

	bezier(p1.x, p1.y, mp1.x, mp1.y, mp2.x, mp2.y, p2.x, p2.y);
}

function aglet(v1, v2, center) {
	stroke(255);
	strokeWeight(16);
	let m1 = v1.midpoint(center);
	let m2 = v2.midpoint(center);
	line(v1.x, v1.y, m1.x, m1.y);
	line(v2.x, v2.y, m2.x, m2.y);

	strokeWeight(10);
	line(v1.x, v1.y, m1.x, m1.y);
	line(v2.x, v2.y, m2.x, m2.y);
}
