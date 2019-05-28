var canvasDiameter = 800;

var circleRadius = 200;

var img;

var SPEED = 256;

function preload() {
	img = loadImage("bg.png");
}

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	noFill();
	strokeWeight(2);
	stroke(255);
}

function draw() {
	image(
		img, 
		0, 
		0, 
		800,
		800	
	);

	translate(canvasDiameter/2, canvasDiameter/2);
	rotate(frameCount/(SPEED*2));
	push();
		rotate(-frameCount/SPEED);	
		translate(-circleRadius/2, 0);
		ellipse(0, 0, circleRadius, circleRadius);
		radiusTriangle(0, 0, 100);
	pop();

	push();
		rotate(-frameCount/SPEED + 2*TAU/3);	
		translate(-circleRadius/2, 0);
		ellipse(0, 0, circleRadius, circleRadius);
		radiusTriangle(0, 0, 100);
	pop();
	push();
		rotate(-frameCount/SPEED + TAU/3);	
		translate(-circleRadius/2, 0);
		ellipse(0, 0, circleRadius, circleRadius);
		radiusTriangle(0, 0, 100);
	pop();
	push();
		translate(circleRadius/2, 0);
		rotate(1 * (-frameCount/SPEED + 2*TAU/3));
		ellipse(0, 0, circleRadius, circleRadius);
		radiusTriangle(0, 0, 100);
	pop();
}

function radiusTriangle(x, y, rad) {
	angleMode(DEGREES);
	triangle(
		x-(cos(0)*rad), y+(sin(0)*rad),
		x-(cos(120)*rad), y+(sin(120)*rad),
		x-(cos(240)*rad), y+(sin(240)*rad)
	);
	angleMode(RADIANS);
}