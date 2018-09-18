var canvasDiameter = 800;
var song, analyzer;

var radius = 500;
var amplitude = 200;

function preload() {
	song = loadSound('neoliberal.mp3');
  }

function setup() {
	var cnv = createCanvas(canvasDiameter, canvasDiameter);

	cnv.parent('canvas_parent')

	song.loop();
	
	// frequency sensor
	fft = new p5.FFT();
	amp = new p5.Amplitude();
}

function draw() {
	background('#99CAEB');
	strokeCap(PROJECT);
	stroke('255');
	strokeWeight(3);
	noFill();

	translate(canvasDiameter/2, canvasDiameter/2);

	// draw the frequency thing
	var waveform = fft.waveform(); 

	var level = amp.getLevel();

	rotate(frameCount/16);
	beginShape();
	for (var i = 0; i< waveform.length; i++){
		var deg = map(i, 0, waveform.length, 0, TAU*12);
		var rad = map( waveform[i], -1, 1, 100, 100 + amplitude);
		rad *= log(i/waveform.length);
		vertex(
			cos(deg) * rad,
			sin(deg) * rad
		)
	}
	endShape();
}