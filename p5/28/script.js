var radius = 400;
var canvasDiameter = 800;
var lineGap = 10;
var lineLength = lineGap - 8;
var lines = [];
var margin = 0;
var rectWidth = 600;
var rectHeight = 600;
var scalar = 0.07;

var bg = "#56797a";
var color1 = "#445e42";
var color2 = "#344f36";
var color3 = "#243d2e";
var pointGap = 20;
var colors = [bg, color1, color2, color3];

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
    strokeCap(ROUND);

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
    background(50);
    
    translate(canvasDiameter/2, canvasDiameter/2);


    fill(bg);
    noStroke();
    rect(-rectWidth/2, -rectHeight/2, rectHeight, rectWidth);

    stroke(200);
    strokeWeight(1);
    translate(-rectWidth/2, -rectHeight/2);

    for (var m=0; m<lines.length; m++) {
        for (var n=0; n<lines[m].length; n++) {
            var mapped = parseInt(map(noise(scalar*m+frameCount/256, scalar*n+frameCount/256, frameCount/128), 0, 1, 0, colors.length));
            var fillColor = colors[mapped];
            noStroke();
            fill(fillColor);
            var rectPoint = lines[m][n];
            rect(rectPoint.x-lineGap/2, rectPoint.y-lineGap/2, lineGap, lineGap);
        }
    }
}

function cross(xPos, yPos, radius) {
    line(xPos-radius, yPos-radius, xPos+radius, yPos+radius);
    line(xPos-radius, yPos+radius, xPos+radius, yPos-radius);
}