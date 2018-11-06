var canvasDiameter = 800;

var lineGap = 20;
var lineLength = lineGap - 8;
var lines = [];
var margin = 200;

var from, to;

var eye = null;
var moveRadius = 100;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

	for (var i=margin + (lineGap % canvasDiameter) / 2; i<canvasDiameter-margin; i+=lineGap) {
		tempLine = [];
		for (var j=margin + (lineGap % canvasDiameter) / 2; j<canvasDiameter-margin; j+=lineGap) {
			var currPoint = new p5.Vector(i, j);
			tempLine.push(currPoint);
		}
		lines.push(tempLine);
	}

	from = color("orange");
	to = color("indigo");

	eye = new p5.Vector(0, 0);
}

function draw() {
	background("#0b0b0d");

	// update eye pos
	var offset = frameCount/256;
	eye.x = (canvasDiameter/2) - (cos(offset) * moveRadius);
	eye.y = (canvasDiameter/2) + (sin(offset) * moveRadius);

	strokeWeight(3);
	noFill();
	for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
			var currPoint = lines[i][j];
			var a = calcVec(currPoint.x - eye.x, currPoint.y - eye.y);
			push();
				translate(currPoint.x, currPoint.y);
				getColor(currPoint);
				rotate(a.heading());
				rotate(-frameCount/128);
				line(-lineLength/2, 0, lineLength/2, 0);
			pop();
		}
	}
}

function calcVec(x, y) {
	return new p5.Vector(y - x, -x - y);
}

function getColor(a) {
	b = map(a.dist(eye), 0, 200, 0, 1)
	stroke(lerpColor(from, to, b));
}