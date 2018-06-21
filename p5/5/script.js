var radius = 300;
var canvasDiameter = 800;

var lineWidth = 3;
var lineGap = 40;

var lines = [];

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	img = loadImage("heatwave.png"); 
	
	//starting at (lineGap % canvasDiameter) / 2 is to center the grid in the canvas
	for (var i=-(lineGap % canvasDiameter) / 2; i<canvasDiameter+lineGap; i += lineGap) {
		var tempArr = [];
		for (var j=-(lineGap % canvasDiameter) / 2; j<canvasDiameter+lineGap; j+=lineGap) {
			var currPoint = {
				x: i,
				y: j
			};
			tempArr.push(currPoint);
		}
		lines.push(tempArr);
	}
}

function draw() {
	background("#58FCEC");

	strokeWeight(lineWidth);
	stroke("rgba(255, 255, 255, 1)");

	var newLines = [];

	for (var i=0; i<lines.length; i++) {
		var tempLine = []
		for (var j=0; j<lines[i].length; j++) {
			var currPoint = lines[i][j];
			tempLine.push({
				x: currPoint.x + sin(frameCount / 16 + i) * 8,
				y: currPoint.y + sin(frameCount / 16 + j) * 8
			});
		}
		newLines.push(tempLine);
	}

	for (var i=0; i<newLines.length; i++) {
		for (var j=0; j<newLines[i].length; j++) {
			//catch corners
			if (i != newLines.length-1 && j != newLines[i].length - 1) {
				var currPoint = newLines[i][j];
				//draw the line down and to the right
				line(currPoint.x, currPoint.y, currPoint.x, newLines[i][j+1].y);
				line(currPoint.x, currPoint.y, newLines[i+1][j].x, currPoint.y);
			}
		}
	}

	image(
		img, 
		0 - sin(frameCount / 16) * 4, 
		0 + cos(frameCount / 16) * 2, 
		800 + sin(frameCount / 16) * 4, 
		800 - cos(frameCount / 16) * 2	
	);
}