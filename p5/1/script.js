var steps = 128;
var radius = 300;
var canvasDiameter = 800;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
}

function draw() {
	background(220);

	push();
	stroke(0);
	strokeWeight(1);
	fill("rgba(0, 0, 0, 0)");
	translate(canvasDiameter/2, canvasDiameter/2);

	for (var i = 0; i < steps; i++) {
		var newRadius = radius + (sin(i/2-frameCount/64)) * 6;
		line(0, 0, 0, newRadius);
		ellipse(0, newRadius + 4, 4, 4);
		rotate(TAU/steps);
	}

	pop();
}