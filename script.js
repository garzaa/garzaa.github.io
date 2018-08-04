var radius = 400;
var canvasDiameter = 600;
var lineGap = 25;
var lineLength = lineGap - 8;
var lines = [];
var margin = 0;
var rectWidth = 600;
var rectHeight = 800;
var scalar = 2;

function setup() {
    var cnv = createCanvas(800, 600);
    cnv.parent("canvas-container")
    
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
    background('rgb(42, 42, 44)');
    translate(800/2, 600/2);

    noStroke();
    fill('rgb(42, 42, 44)');
    rect(-rectHeight/2, -rectWidth/2, rectHeight, rectWidth);

    fill('rgba(228, 27, 73, 0.3)');
    for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
            var currPoint = lines[i][j];
            var current = createVector(rectHeight/2 - currPoint.x, rectWidth/2 - currPoint.y);
            var towards = createVector(sin(frameCount/32)*64, -cos(frameCount/32)*64).sub(current);
            var newVec = current.add(towards.div(16));
			ellipse(newVec.x, newVec.y, 3);
		}
    }

    fill('rgba(228, 27, 73, 0.5)');
    for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
            var currPoint = lines[i][j];
            var current = createVector(rectHeight/2 - currPoint.x, rectWidth/2 - currPoint.y);
            var towards = createVector(sin(frameCount/32)*64, -cos(frameCount/32)*64).sub(current);
            var newVec = current.add(towards.div(32));
			ellipse(newVec.x, newVec.y, 3);
		}
    }

    fill('rgb(228, 27, 73)');
    for (var i=0; i<lines.length; i++) {
		for (var j=0; j<lines[i].length; j++) {
            var currPoint = lines[i][j];
			ellipse(rectHeight/2 - currPoint.x, rectWidth/2 - currPoint.y, 3);
		}
    }
}