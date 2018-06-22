var radius = 300;
var canvasDiameter = 800;

var speed = 32;
var magnitude = 10;
var waveLength = 4;
var lineWidth = 3;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
}

function draw() {
	background("#DCCDE8");

	translate(canvasDiameter/2, canvasDiameter/2);
	
	var startPixel = -radius;
	var endPixel = radius;
	
	var widths = [];

	for (var i = startPixel+1; i < endPixel; i++) {
		currentRadius = sqrt((radius * radius) - (i * i));
		if (i < 0) {
			currentRadius += sin((frameCount / speed) + (i / waveLength)) * magnitude * pow(abs(i/ 200), 2);
		} else {
			currentRadius += sin((-frameCount / speed) + (i / waveLength)) * magnitude * pow(abs(i/ 200), 2);
		}
		widths.push(currentRadius);
	}

	noStroke();
	fill("#B37BA4");
	beginShape();
	for (var j=0; j<widths.length; j++) {
		vertex(widths[j], j+startPixel);
	}
	for (var j=widths.length-1; j>=0; j--) {
		vertex(-widths[j], j+startPixel);
	}
	endShape(CLOSE);
}