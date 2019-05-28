var canvasDiameter = 800;

var bg = "#F7F6C5";

var colors = [
	"#264653",
	"rgba(0, 0, 0, 0)",
	"#2A9D8F",
	"#E9C46A",
	"#F4A261",
	"#E76F51"
]

var circles = []

var circleDiameter = 40;
var circleMargin = 20;

var lerpAmount = 0.12;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	noStroke();
	colors.forEach(function(c, idx) {
		circles.push(new SwappableCircle(c, idx))
	});	
}

function draw() {
	background(bg);
	// center
	translate(canvasDiameter/2, canvasDiameter/2);

	translate(
		-(circleMargin/2) - (circleDiameter/2),
		-circleMargin - circleDiameter
	);

	circles.forEach(circle => {
		circle.run();
	});

	if (frameCount % 80 == 0) {
		randomSwap();
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

class SwappableCircle {
	constructor(c, idx) {
		this.c = c;
		this.idx = idx;
		this.position = getCoords(idx);
		this.swapping = false;
		this.targetPosition = null;
	}

	display() {
		push();
			fill(this.c);
			ellipse(this.position.x, this.position.y, circleDiameter, circleDiameter);
		pop();
	}

	update() {
		if (this.swapping) {
			//lerp towards target
			this.position = createVector(
				lerp(this.position.x, this.targetPosition.x, lerpAmount),
				lerp(this.position.y, this.targetPosition.y, lerpAmount)
			)
			//if difference is less than 1 pixel, just move there
			if (this.position.dist(this.targetPosition) < 1) {
				this.position = this.targetPosition;
			}
		}
	}

	run() {
		this.update();
		this.display();
	}

	startSwap(otherIdx, initiator=false) {
		this.swapping = true;
		this.targetPosition = circles[otherIdx].position;
		if (initiator) {
			circles[otherIdx].startSwap(this.idx, false);
		}
	}
}

function randomSwap() {
	var i1 = Math.floor(Math.random() * circles.length);
	var i2 = 0;
	if (i1 == 0) {
		i2 = 1;
	} else if (i1 == circles.length-1) {
		i2 = i1-1;
	} else {
		if (isEven(i1)) {
			i2 = i1 + (Math.floor(Math.random() * 2 == 0) ? 1 : -2);
		} else {
			i2 = i1 + (Math.floor(Math.random() * 2 == 0) ? 2 : -1);
		}
	}
	circles[i1].startSwap(i2, true);
}