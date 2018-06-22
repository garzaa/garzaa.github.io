var canvasDiameter = 800;
var circleRadius = 100;
var numCircles = 6;
var circles = [];
var points = [];

//perlin noise
var yoff = 0.0;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	for (var i=0; i<numCircles; i++) {
		circles.push(createGoodVector());
	}

	for (var i=0; i<circles.length; i++) {
		var p = circles[i];
		var x = p.x;// + map(noise(xoff + i/2), 0, 1, -circleRadius,circleRadius);
		var y = p.y + map(noise(yoff + i/2), 0, 1, -circleRadius,circleRadius);
		ellipse(x, y, 10, 10);
		points.push(new Particle(x, y));
	}

	//then get initial closest points
	for (var j=0; j<points.length; j++) {
		var minDistance1 = Infinity;
		var minDistance2 = Infinity;
		var closest1 = null;
		var closest2 = null;
		for (var i=0; i<points.length; i++) {
			var currDistance = points[j].position.dist(points[i].position);
			if (currDistance < minDistance2 && currDistance != 0) {
				if (currDistance < minDistance1) {
					minDistance1 = currDistance;
					closest1 = points[i];
				} else {
					minDistance2 = currDistance;
					closest2 = points[i];
				}
			}
		}
		points[j].closest1 = closest1;
		points[j].closest2 = closest2;
	}
}

//"good": no collisions between circles
function createGoodVector() {
	var tempVec = createVector(
		random(circleRadius, canvasDiameter-circleRadius),
		random(circleRadius, canvasDiameter-circleRadius)
	);
	var collision = true;
	while (collision) {
		collision = false;
		for (var i=0; i<circles.length; i++) {
			if (tempVec.dist(circles[i]) < circleRadius) {
				collision = true;
				break;
			}
		}
		if (collision) {
			tempVec = createVector(
				random(circleRadius, canvasDiameter-circleRadius),
				random(circleRadius, canvasDiameter-circleRadius)
			);
		}
	}
	return tempVec;
}

function draw() {
	background(220);
	strokeWeight(1);
	fill(50);
	stroke(220);

	//get new perlin random position for points
	for (var i=0; i<points.length; i++) {
		var p = circles[i];
		var x = p.x;
		var y = p.y + map(noise(yoff + i/2), 0, 1, -circleRadius,circleRadius);
		points[i].position = createVector(x, y);
	}

	yoff += 0.002;

	for (var j=0; j<points.length; j++) {
		var p = points[j];
		var v1 = p.position;
		var v2 = p.closest1.position;
        var v3 = p.closest2.position;
		triangle(
			v1.x, 
			v1.y, 
			v2.x, 
			v2.y, 
			v3.x, 
			v3.y
        );

        //then draw rings and lines
        push();
        stroke(50);
        noFill();   
        ellipse(p.position.x, p.position.y-6, 15, 15);
        line(p.position.x, p.position.y - 15, p.position.x, p.position.y - canvasDiameter);
        stroke(220);
        ellipse(p.position.x, p.position.y-6, 13, 13);
        line(p.position.x+1, p.position.y - 15, p.position.x, p.position.y - canvasDiameter);
        pop();
	}
}

var Particle = function(x, y) {
	this.position = createVector(x, y);
	this.closest1 = null;
	this.closest2 = null;
}
