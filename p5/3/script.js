var canvasDiameter = 800;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
  	max_distance = dist(0, 0, width, height);
}

function draw() {
	background("#FEC3A6");
	strokeWeight(0);
	fill("#FF928B");
	
	for(var i = 0; i <= canvasDiameter; i += 20) {
	    for(var j = 0; j <= height; j += 20) {
			var size = dist(canvasDiameter/2, canvasDiameter/2, i, j);
			size += sin(frameCount / 24) * 24;
			size = size/max_distance * 80;
			ellipse(i, j, size, size);
	    }
	}

}