var canvasDiameter = 800;
var song, analyzer;

var radius = 500;
var amplitude = 10;

function preload() {
	song = new p5.AudioIn();
  }

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

	song.start();
	
	// frequency sensor
	fft = new p5.FFT();
	fft.setInput(song);
}

function draw() {
	background(0);
	strokeCap(PROJECT);
	stroke('255');
	strokeWeight(3);
	noFill();

	translate(canvasDiameter/2, canvasDiameter/2);

	// draw the frequency thing
	var waveform = fft.waveform(); 

	rotate(frameCount/16);
	beginShape();
	for (var i = 0; i< waveform.length; i++){
		var deg = map(i, 0, waveform.length, 0, TAU*12);
		// scale waveform
		var rad = map(logTransform(waveform[i]), 0, 1, 0, amplitude);
		rad += 100;
		rad *= log(i/waveform.length);
		vertex(
			cos(deg) * rad,
			sin(deg) * rad
		)
	}
	endShape();
}

function logTransform(x) {
	// initial spike and gradually level off as x reaches 1
	return log(15*x + 18) - 0.5
}
