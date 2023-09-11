const canvasSize = 900;
const gridSize = new vec2(3, 8);
const cellSize = 100;
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
const laces = [
	"#e3e8e7",
	"#a5b6b2",
	"#96a8a4",
]
const laces2 = [
	"#8da39f",
	"#839691",
	"#7f928d",
]

const agletChance = 0.03;
let aglets = [];

function setup() {
	createCanvas(canvasSize, canvasSize);
	noFill();
	grid = new HexGrid(new vec2(275, 300), gridSize, cellSize);
	sideLength = cellSize * 0.5;
	sideOffset = new vec2(sideLength/2, grid.cellSize.y/2);
	noLoop();
	for (let i=0; i<laces.length; i++) {
		laces[i] = color(laces[i]);
	}
	for (let i=0; i<laces2.length; i++) {
		laces2[i] = color(laces2[i]);
	}
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
	stroke("#f5b642");
	strokeWeight(3);
	polygon(c.worldCoords.x, c.worldCoords.y, cellSize/2, 6);
}

function drawCell(c) {
	let points = getPerimeterPoints(c.worldCoords);
	let p1, p2 = null;
	// iT IS doable
	// start with the top left corner and work clockwise
	/*
		4
	  3   5
	  2   0
		1
	*/
	// this only works for x-odd y-even grids :')
	if (c.gridCoords.y == 0) {
		let c1 = grid.cellToWorld(c.gridCoords.add(new vec2(0, -1)));
		p1 = points[3];
		p2 = getPerimeterPoints(grid.cellToWorld(c.gridCoords.add(new vec2(0, 1))))[4];
		edgeBezier(c, p1, p2, c1, c1);

		c1 = grid.cellToWorld(c.gridCoords.add(new vec2(0, -2)));
		let c2 = grid.cellToWorld(c.gridCoords.add(new vec2(1, -1)));
		p1 = points[4];
		p2 = getPerimeterPoints(grid.cellToWorld(c.gridCoords.add(new vec2(1, -1))))[2];
		edgeBezier(c, p1, p2, c1, c2, false);
	} else if (c.gridCoords.y == gridSize.y-1) {
		// connect 1 to 0
		let c1 = grid.cellToWorld(c.gridCoords.add(new vec2(0, 2)));
		p1 = points[1];
		p2 = points[0];
		let c2 = grid.cellToWorld(c.gridCoords.add(new vec2(0, 1)));
		edgeBezier(c, p1, p2, c1, c2, false);
	}

	if (c.gridCoords.x == 0 && c.gridCoords.y % 2 == 1) {
		let c1 = grid.cellToWorld(c.gridCoords.add(new vec2(-1, -1)));
		p1 = points[3];
		p2 = points[2];
		let c2 = grid.cellToWorld(c.gridCoords.add(new vec2(-1, 1)));
		edgeBezier(c, p1, p2, c1, c2, false);
	} else if (c.gridCoords.x == gridSize.x-1 && c.gridCoords.y > 0 && c.gridCoords.y % 2 == 0) {
		p1 = points[5];
		p2 = getPerimeterPoints(grid.cellToWorld(c.gridCoords.add(new vec2(0, -2))))[0];
		let c1 = grid.cellToWorld(c.gridCoords.add(new vec2(1, -1)));
		edgeBezier(c, p1, p2, c1, c1, true);
	}

	if (c.gridCoords.y == gridSize.y-1 && c.gridCoords.x > 0) {
		p1 = points[2];
		p2 = getPerimeterPoints(grid.cellToWorld(c.gridCoords.add(new vec2(-1, 1))))[4];
		let c1 = grid.cellToWorld(c.gridCoords.add(new vec2(-1, 1)));
		edgeBezier(c, p1, p2, c1, c1, true);
	}

	if (c.gridCoords.x == gridSize.x-1 && c.gridCoords.y == gridSize.y-2) {
		p1 = points[0];
		p2 = points[1];
		let c1 = grid.cellToWorld(c.gridCoords.add(new vec2(1, 1)));
		let c2 = grid.cellToWorld(c.gridCoords.add(new vec2(0, 2)));
		edgeBezier(c, p1, p2, c1, c2, false);
	}

	while (points.length > 0) {
		let v1 = yoink(points);
		let v2 = yoink(points);
		// then draw a bezier between the two
		// darken it as it gets closer to the bottom
		let idx = randomInt(laces.length);
		stroke(lerpColor(laces[idx], laces2[idx], c.worldCoords.y / canvasSize));
		strokeWeight(12);
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
			c.add(
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

function edgeBezier(c, p1, p2, c1, c2, useMidpoint=true) {
	let mp1 = useMidpoint ? p1.midpoint(c1) : c1;
	let mp2 = useMidpoint ? p2.midpoint(c2) : c2;
	let idx = randomInt(laces.length);
	stroke(lerpColor(laces[idx], laces2[idx], c.worldCoords.y / canvasSize));
	strokeWeight(12);
	bezier(p1.x, p1.y, mp1.x, mp1.y, mp2.x, mp2.y, p2.x, p2.y);
}

function aglet(v1, v2, center) {
	stroke(255);
	strokeWeight(5);
	let m1 = v1.midpoint(center);
	let m2 = v2.midpoint(center);
	line(v1.x, v1.y, m1.x, m1.y);
	line(v2.x, v2.y, m2.x, m2.y);

	strokeWeight(10);
	line(v1.x, v1.y, m1.x, m1.y);
	line(v2.x, v2.y, m2.x, m2.y);
}
