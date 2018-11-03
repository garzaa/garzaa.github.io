var radius = 400;

var bg = "#F7F6C5";

var colors = [
	"#264653",
	"#F3FAE1",
	"#2A9D8F",
	"#E9C46A",
	"#F4A261",
	"#E76F51"
]

var circles = []

var circleDiameter = 150;
var circleMargin = 50;

var canvasDiameter = 800;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	noStroke();
	circles.forEach(circle => {
		circle.run();
	})
}

function draw() {
	background(bg);
	// center
	translate(canvasDiameter/2, canvasDiameter/2);

	// go to the top left 
	var numCircles = colors.length;
	translate(
		-(circleMargin/2) - (circleDiameter/2),
		-circleMargin - circleDiameter
	)
	for (var i=0; i<colors.length; i++) {
		push();
			var coords = getCoords(i);
			fill(colors[i]);
			ellipse(coords.x, coords.y, circleDiameter, circleDiameter);
		pop();
	}
}

function getCoords(i) {
	var xVal = isEven(i) ? 0 : 1;
	xVal *= (circleDiameter + circleMargin);

	var yVal = Math.floor(i/2);
	yVal *= (circleDiameter + circleMargin);

	return createVector(xVal, yVal);
}

function isEven(i) {
	return i % 2 == 0;
}

class swappableCircle {
	constructor(idx, c) {
		this.swappingWith = null;
		this.swapping = false;
		this.c = c;
		this.idx = idx;
		this.originalPosition = getCoords(index);
	}

	display() {
		push();
		if (!this.swapping) {
			fill(this.c);
			posVec = getCoords(this.idx);
			ellipse()
		}
		pop();
	}

	update() {

	}

	run() {
		this.update();
		this.display();
	}
}