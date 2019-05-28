var w = window.innerWidth;
var h = window.innerHeight;

var song, analyzer, amp;

var margin = 50;
var origShapeSize = 10;
var amplitude = 40;
var shapes = []

function preload() {
	song = new p5.AudioIn();
  }

function setup() {
	createCanvas(w, h);

	song.start();
	
	// frequency sensor
	fft = new p5.FFT();
	fft.setInput(song);
	background(0);
	noFill();

	for (var i=margin + (margin % w) / 2; i<w-margin; i+=margin+origShapeSize/2) {
		tempShape = [];
		for (var j=margin + (margin % h) / 2; j<h-margin; j+=margin+origShapeSize/2) {
			var currPoint = {
				x: i,
				y: j,
				radius: origShapeSize/2
			};
			stroke(255);
			strokeWeight(2);
			tempShape.push(currPoint);
			ellipse(i, j, 10, 10);
		}
		shapes.push(tempShape);
	}
	shapes = [].concat.apply([], shapes);
}

function draw() {
	stroke(255);
	strokeWeight(5);
	background(0);

	lvl = song.getLevel();
	var waveform = fft.waveform(); 

	amp = waveform[floor(waveform.length/2)]
	shapes[0].radius = origShapeSize + (amp * amplitude);

	for (var i=0; i<shapes.length; i++) {
		var currPoint = shapes[i];
		push();
		//propagate on delay
		if ((frameCount+ i) % 5 == 0 
			&& i > 0) {
			currPoint.radius = shapes[i-1].radius;
		}

		var rad = currPoint.radius;
		translate(currPoint.x, currPoint.y);
		line(-rad, rad, rad, -rad);
		line(rad, rad, -rad, -rad);
		pop();
	}
}
