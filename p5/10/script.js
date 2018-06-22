var radius = 400;
var canvasDiameter = 800;
var lineGap = 20;
var lineLength = lineGap - 8;
var lines = [];
var margin = 10;
var rectWidth = 300;
var rectHeight = 600;
var scalar = 2;

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
    
    for (var i=margin + (lineGap % rectWidth) / 2; i<rectWidth-margin; i+=lineGap) {
		tempLine = [];
		for (var j=margin + (lineGap % rectHeight) / 2; j<rectHeight-margin; j+=lineGap) {
			var currPoint = {
				x: j,
				y: i
			};
			tempLine.push(currPoint);
		}
		lines.push(tempLine);
    }
}

function draw() {
    background(220);
    translate(canvasDiameter/2, canvasDiameter/2);

    noStroke();
    fill(50);
    rect(-rectHeight/2, -rectWidth/2, rectHeight, rectWidth);

    fill(100);
    for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
            var currPoint = lines[i][j];
            var current = createVector(rectHeight/2 - currPoint.x, rectWidth/2 - currPoint.y);
            var towards = createVector(sin(frameCount/32)*64, -cos(frameCount/32)*64).sub(current);
            var newVec = current.add(towards.div(24));
			ellipse(newVec.x, newVec.y, 4);
		}
    }

    fill(200);
    for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
            var currPoint = lines[i][j];
			ellipse(rectHeight/2 - currPoint.x, rectWidth/2 - currPoint.y, 4);
		}
    }
}