function preload() {
	song = new p5.AudioIn();
  }

function setup() {
	var cnv = createCanvas(canvasDiameter, canvasDiameter);

	cnv.parent('canvas_parent')

	song.start();
	
	// frequency sensor
	fft = new p5.FFT();
	fft.setInput(song);
}