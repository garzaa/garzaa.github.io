var w = window.innerWidth;
var h = window.innerHeight;
var song, analyzer, amp;

var radius = 500;
var amplitude = 50;

var numShapes = 10;
var shapeGap = 70;

function preload() {
	song = new p5.AudioIn();
  }

function setup() {
	createCanvas(w, h);

	song.start();
	
	// frequency sensor
	fft = new p5.FFT();
	fft.setInput(song);
}

function draw() {
	background(0);
	stroke('red');
	strokeWeight(5);
	fill(0);

	translate(w/2, h/2);

	lvl = song.getLevel();

	for (var j=numShapes-1; j>0; j--) {
		push();
		rotate(sin((j+1) * frameCount/256) * (j % 2 == 0 ? 1 : -1));
		// i = number of sides
		numSides = 5
		beginShape();
		for (var i=0; i<numSides; i++) {
			var rot = (i/numSides) * TAU;
			var rad = j * shapeGap;
			rad *= log(rad) / 8;
			rad += lvl * amplitude * j/2;
			vertex(
				cos(rot) * rad,
				sin(rot) * rad
			);
		}
		endShape(CLOSE);
		pop();
	}
}
