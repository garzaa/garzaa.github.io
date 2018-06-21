var radius = 400;
var numEllipses = 4;
var canvasDiameter = 800;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
}

function draw() {
	background("#764ba2");
	fill("rgba(0, 0, 0, 0)");
	stroke(255);
	translate(canvasDiameter/2, canvasDiameter/2);
	for (var i=0; i<numEllipses; i++) {
		var scalar = i % 2 == 0 ? i : -i;
		push();
		rotate(scalar * (1/4 * (frameCount/128) + (i * 2)));
		ellipse(0, 0, radius, radius-(40 * cos(frameCount/128)));
		pop();
	}
}