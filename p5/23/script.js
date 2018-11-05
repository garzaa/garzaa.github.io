var canvasDiameter = 800;

var lineGap = 20;
var lineLength = lineGap - 8;
var lines = [];
var margin = 200;

//perlin noise
var yoff = 0.0;
var xoff = 0.0;

var from, to;

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

	from = color("red");
	to = color("blue");
}

function draw() {
	background("#0b0b0d");

	strokeWeight(3);
	noFill();
	for (var i=0; i<lines.length; i++) {
		var currXOff = xoff + i/10;
		for (var j=0; j<lines[i].length; j++) {
			xoff += 0.00001
			var currYOff = yoff + j/10;
			var theta = map(noise(currXOff,currYOff),0,1,0,TAU);
			var currPoint = lines[i][j];
			push();
				translate(currPoint.x, currPoint.y);
				getColor(theta);
				rotate(theta);
				rotate(-frameCount/128);
				line(-lineLength/2, 0, lineLength/2, 0);
			pop();
			yoff += 0.00001;
		}
	}
}

function calcVec(x, y) {
	return new p5.Vector(y - x, - x - y);
}

function getColor(theta) {
	stroke(lerpColor(from, to, theta/TAU));
}