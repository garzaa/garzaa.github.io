var canvasDiameter = 800;

var numLines = 200;
var lineGap = 2;
var lineHeight = 400;

var xoff = 0.0;
var yoff = 0.0;
var scalar = 0.01;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

}

function draw() {
	background("#335C67");
	stroke("#FFF3B0");
	noFill();
	strokeWeight(1);

	//perlin noise
	xoff += scalar;
	yoff -= scalar;

	translate(canvasDiameter/2, canvasDiameter/2);

	for (var i=0; i<numLines; i++) {
		push();
		//lines are 1px wide so we can do this painlessly
		//move to the top of the current line
		translate(-(numLines * lineGap)/2 + (i * lineGap), -lineHeight/2);
		//position of first and second anchor points
		var n1 = createVector((noise(yoff+(i/32))-0.5)*200, 200*noise(xoff + (i/16)));
		var n2 = createVector((noise(xoff+(i/32))-0.5)*200, lineHeight - 200*noise(yoff - (i/16)));
		bezier(0, 0, n1.x, n1.y, n2.x, n2.y, 0, lineHeight);
		pop();
	}
}
