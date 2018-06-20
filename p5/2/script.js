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
	background("#F5E3E0");

	translate(canvasDiameter/2, canvasDiameter/2);

	stroke("#F9B4ED");
	strokeCap(ROUND);
	strokeWeight(1);
	fill("rgba(0, 0, 0, 0)");
	
	var startPixel = -radius;
	var endPixel = radius;
	
	for (var i = startPixel+1; i < endPixel; i++) {
		currentRadius = sqrt((radius * radius) - (i * i));
		if (i < 0) {
			currentRadius += sin((frameCount / speed) + (i / waveLength)) * magnitude * pow(abs(i/ 200), 2);
		} else {
			currentRadius += sin((-frameCount / speed) + (i / waveLength)) * magnitude * pow(abs(i/ 200), 2);
		}
		line(-currentRadius, i, currentRadius, i);
	}

}