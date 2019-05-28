var canvasDiameter = 800;

var lineGap = 30;
var lineLength = lineGap - 10;
var lines = [];
var margin = 200;

var bg = 220;
var fg = 50;

//perlin noise
var yoff = 0.0;
var xoff = 0.0;

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
	noFill();
	stroke(fg);
}

function drawSquare(weight, posVec) {
	push();
		strokeWeight(weight);
		rect(posVec.x, posVec.y, lineLength, lineLength);
	pop();
}

function draw() {
	background(bg);
	for (var i=0; i<lines.length; i++) {
		var currXOff = xoff + i/10;
		for (var j=0; j<lines[i].length; j++) {
			xoff += 0.00001
			var currYOff = yoff + j/10;
			var theta = map(noise(currXOff,currYOff),0,1,20,100);
			var currPoint = lines[i][j];
			drawSquare(theta / 10, currPoint);
			yoff += 0.00001;
		}
	}
}