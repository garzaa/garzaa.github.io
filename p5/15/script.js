var canvasDiameter = 800;
var radius = 400;
var numLayers = 29;
var increment = 2;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	background(50);
}

function draw() {
	translate(canvasDiameter/2, canvasDiameter/2+100);
	strokeWeight(3);
	stroke(220);
	noFill();
	background(50);

	rotate(-PI/2);
	var p1 = ptoc(radius, 0);
	var p2 = ptoc(radius, TAU/3);
	var p3 = ptoc(radius, 2*TAU/3)
	
	//triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
	
	//just move and rotate
	strokeWeight(1);
	for (var i=0; i<numLayers; i++) {
		var currentRadius = (radius - (i**2)/2) - abs(sin(frameCount / 64)+1) * i/4;
		var p1 = ptoc(currentRadius, 0);
		var p2 = ptoc(currentRadius, TAU/3);
		var p3 = ptoc(currentRadius, 2*TAU/3);	
		
		//draw points along each line, increasing with the number of layers and starting with one
		//starting from the outside despite i increasing
		var numPoints = numLayers-i;
		var totalDistance = p1.dist(p2);
		push();
		translate(currentRadius, 0);
		rotate(TAU/6);
		pointsOnLine(numPoints, totalDistance);
		pop();

		push();
		rotate(TAU/3);
		translate(currentRadius, 0);
		rotate(TAU/6);
		pointsOnLine(numPoints, totalDistance);
		pop();

		push();
		rotate(2*TAU/3);
		translate(currentRadius, 0);
		rotate(TAU/6);
		pointsOnLine(numPoints, totalDistance);
		pop();
	}
}

function ptoc(r, theta) {
	var x = r * cos(theta);
	var y = r * sin(theta);
	return createVector(x, y);
}

function pointsOnLine(numPoints, totalDistance) {
	for (var j=0; j<numPoints; j++) {
		var currentDistance = j * (totalDistance/numPoints) + sin(frameCount/(8*numPoints))*2;
		ellipse(0, currentDistance, 3, 3);
	}
}