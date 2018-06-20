var radius = 300;
var canvasDiameter = 800;

var speed = 32;
var magnitude = 10;
var waveLength = 4;
var lineWidth = 3;

var numVertices = 6;
var numLayers = 10;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
}

function draw() {
	translate(canvasDiameter/2, canvasDiameter/2);
	rotate(sin(frameCount / 120) * 2);

	background("#2E282A");
	strokeWeight(0);
	fill("#17BEBB");
	
	push();

	newVertices = numVertices + (sin(frameCount / 120) * 3);

	for (var i = 0; i < newVertices; i++) {
		for (var j=0; j < numLayers; j++) {
			push();
			var outsideColor = color(15, 141, 199, 255);
			var insideColor = color(238, 96, 156, 255);
			var currColor = lerpColor(outsideColor, insideColor, j/numLayers)
			fill(currColor);
			var newRadius = radius - (j*j) * 2;
			ellipse(0, newRadius, lineWidth, lineWidth);
			pop();
		}

		rotate(TAU/newVertices);
	}
	pop();

}