var canvasDiameter = 800;
var bg = "#3BC14A";
var numSegments = 24;
var lineWeight = 6;
var lineGap = 14;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	background(bg);
}

function draw() {
	var outer = color("#FFFBFA");
	translate(canvasDiameter/2, canvasDiameter/2);
	background(bg);
	strokeWeight(lineWeight);
	noFill();
	rotate(frameCount/32);
	for (var i=0; i<numSegments; i++) {
		rotate(sin(frameCount/128));
		push();
		stroke(outer);
		arc(0, 0, i * (lineGap + lineWeight), i * (lineGap + lineWeight), TAU/2, TAU/2, false);
		pop();
	}
}