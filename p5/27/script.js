var canvasDiameter = 800;

var lineGap = 40;
var shapeGap = 20;
var circleDiameter = lineGap - shapeGap;
var circles = [];
var margin = 100;

var from, to;

var bg = "#3b3b3d";

var lerpAmount = 0.5;

var amplitudeThreshold = 0.1;
var maxAmpRadius = canvasDiameter; 
var song, analyzer, amp;

var toIncreaseEntropy = false;
var entropyInterval = 100;
var toDecreaseEntropy = false;
var entropyDecreaseInterval = 1000;

function preload() {
	song = new p5.AudioIn();
	song.start();
}

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

	// frequency sensor
	fft = new p5.FFT();
	fft.setInput(song);

	from = color("coral");
	to = color("indigo");

	var counter = 0;

	var m, n;

	for (m=margin + (lineGap % canvasDiameter) / 2; m<canvasDiameter-margin; m+=lineGap) {
		for (n=margin + (lineGap % canvasDiameter) / 2; n<canvasDiameter-margin; n+=lineGap) {
			counter += 1;
		}
	}

	var totalCircles = counter;
	counter = 0;

	for (m=margin + (lineGap % canvasDiameter) / 2; m<canvasDiameter-margin; m+=lineGap) {
		tempLine = [];
		for (n=margin + (lineGap % canvasDiameter) / 2; n<canvasDiameter-margin; n+=lineGap) {
			var posVec = new p5.Vector(m, n);
			tempLine.push(new SwappableCircle(lerpColor(from, to, counter/totalCircles), counter, posVec));
			counter += 1;
		}
		// append them all instead of a list\
		circles.push.apply(circles, tempLine);
	}
	strokeWeight(0);

	setInterval(checkforEntropyDecrease, entropyDecreaseInterval);
	setInterval(checkForEntropyIncrease, entropyInterval);
}

function draw() {
	background("#111");

	push();
		noFill();
		stroke(100);
		strokeWeight(2);
		lvl = song.getLevel();
		lvl = log(lvl + 0.15)/2 + 1;
		if (lvl > amplitudeThreshold) {
			toIncreaseEntropy = true;
		} else {
			toDecreaseEntropy = true;
		}
		//ellipse(canvasDiameter/2, canvasDiameter/2, lvl * maxAmpRadius, lvl * maxAmpRadius);
	pop();

	circles.forEach(circle => {
		circle.run();
	});
}

class SwappableCircle {
	constructor(c, idx, posVec) {
		this.c = c;
		this.idx = idx;
		this.origIdx = idx;
		this.position = posVec;
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
			);
			//if difference is less than 1 pixel, just move there and call it a day
			if (this.position.dist(this.targetPosition) < 1) {
				this.position = this.targetPosition;
				this.swapping = false;
			}
		}
	}

	run() {
		this.update();
		this.display();
	}

	startSwap(otherIdx, initiator) {
		if (initiator && this.swapping) {
			return;
		}
		this.swapping = true;
		this.targetPosition = getCircleAt(otherIdx).position;
		if (initiator) {
			getCircleAt(otherIdx).startSwap(this.idx, false, this.idx);
			this.idx = otherIdx;
		} else {
			this.idx = otherIdx;
		}
	}
}

function isEven(i) {
	return i % 2 == 0;
}

function getRandom(arr) {
	return Math.floor(Math.random() * arr.length);
}

function randomSwap() {
	var i1 = getRandom(circles);
	var i2 = getRandom(circles);
	while (i2 == i1) {
		while (getCircleAt(i1).swapping) {
			i1 = getRandom(circles);
		} 
		
		while (getCircleAt(i2).swapping) {
			i2 = getRandom(circles);
		}

		i2 = getRandom(circles);
	}
	initSwap(i1, i2);
}

function initSwap(i1, i2) {
	getCircleAt(i1).startSwap(i2, true);
}

function getCircleAt(idx) {
	for (var i=0; i<circles.length; i++) {
		if (circles[i].idx == idx) {
			return circles[i];
		}
	}
	console.log(idx);
	console.log("brainlet alert");
	return null;
}

function reverseEntropy() {
	var badCircles = [];
	circles.forEach(c => {
		if (c.idx != c.origIdx) {
			badCircles.push(c);
		}
	});

	if (badCircles.length > 1) {
		var badCircle = badCircles[getRandom(badCircles)];
		var i1 = badCircle.idx;
		//then get the circle at its original index
		var i2 = getCircleAt(badCircle.origIdx).idx;
		initSwap(i1, i2);
	}
}

function checkForEntropyIncrease() {
	if (toIncreaseEntropy) {
		randomSwap();
		toDecreaseEntropy = false;
		toIncreaseEntropy = false;
	}
}

function checkforEntropyDecrease() {
	if (!toIncreaseEntropy) {
		reverseEntropy();
		toDecreaseEntropy = false;
	}
}