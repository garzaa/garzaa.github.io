var canvasDiameter = 800
var song, analyzer

function preload() {
	song = loadSound('yogapants.mp3');
  }

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);

	song.loop();
	
	// frequency sensor
	fft = new p5.FFT();
}

function draw() {
	background('#ffd1d7');
	strokeCap(PROJECT);
	stroke(100);
	strokeWeight(3);
	noFill();
	// draw the top 3 lines of the square
	line(canvasDiameter/2-200, canvasDiameter/2-200, canvasDiameter/2+200, canvasDiameter/2-200)
	line(canvasDiameter/2+200, canvasDiameter/2+200, canvasDiameter/2+200, canvasDiameter/2-200)
	line(canvasDiameter/2-200, canvasDiameter/2+200, canvasDiameter/2-200, canvasDiameter/2-200)

	// draw the frequency thing
	var waveform = fft.waveform(); 

	beginShape();
	for (var i = 0; i< waveform.length; i++){
		var x = map(i, 0, waveform.length, 1, 400);
		var y = map( waveform[i], -1, 1, -100, 100);
		y *= sin((i/waveform.length)*PI)
		vertex(canvasDiameter/2-200 + x,canvasDiameter/2+202 + y);
	}
	endShape();
}

document.addEventListener("click", function() {
    window.location = "https://creamygelato.bandcamp.com/track/yoga-pants";
});