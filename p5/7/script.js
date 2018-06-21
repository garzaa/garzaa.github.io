var radius = 400;
var canvasDiameter = 800;
var lineGap = 20;
var lineLength = lineGap - 8;
var lines = [];
var margin = 200;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

	for (var i=margin + (lineGap % canvasDiameter) / 2; i<canvasDiameter-margin; i+=lineGap) {
		tempLine = [];
		for (var j=margin + (lineGap % canvasDiameter) / 2; j<canvasDiameter-margin; j+=lineGap) {
			var currPoint = {
				x: i,
				y: j
			};
			tempLine.push(currPoint);
		}
		lines.push(tempLine);
	}
}

function draw() {
	background("#FF82A9");
	strokeWeight(3);
	stroke(255);
	noFill();
	for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
			var currPoint = lines[i][j];
			push();
			translate(currPoint.x, currPoint.y);
			rotate(sin(-frameCount / 16 + i/2 + j/2) / 2);
			line(-lineLength/2, 0, lineLength/2, 0);
			pop();
		}
	}
}