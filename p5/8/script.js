var canvasDiameter = 800;
var innerRadius = 400;
var outerRadius = 600;
var numParticles = 36;
var system;
var speed = 0.05;
var rotationDiv = 1024;
var maxParticleDistance = 65;
var orbitalRadius = 115;
var earthRadius = 200;
var moonBehindEarth = false;
var lastMoonPos = null;
var negSignLastFrame = false;

function setup() {
	createCanvas(canvasDiameter, canvasDiameter);
	system = new ParticleSystem();
	for (var i=1; i<=numParticles; i++) {
		var angle = (TAU/numParticles) * i;
		system.addParticle(250 * sin(angle), 250 * cos(angle));
	}
}

function draw() {
	translate(canvasDiameter/2, canvasDiameter/2);
	background("#4B4E6D");
	strokeWeight(1);
	push();
	noFill();
	stroke("white");
	rotate((frameCount/rotationDiv));
	//stars
	system.run();
	pop();
	drawMoon();
}

class Particle {
	constructor(x, y) {
		this.velocity = createVector(random(-1, 1), random(1, -1)).mult(speed);
		this.position = createVector(x, y);
	}
	run() {
		this.update();
		this.display();
	}
	update() {
		if (dist(this.position.x, this.position.y, 0, 0) > outerRadius / 2
			|| dist(this.position.x, this.position.y, 0, 0) < innerRadius / 2) {
			var normal = createVector(this.position.x, this.position.y, 0, 0).normalize();
			var d = this.velocity;
			//newVelocity = d - 2(d * n)n
			var innerParens = p5.Vector.dot(d, normal) * 2;
			var secondTerm = normal.mult(innerParens);
			this.velocity = this.velocity.sub(secondTerm);
		}
		this.position.add(this.velocity);
		//draw lines to the two nearest particles
		var minDistance1 = Infinity;
		var minDistance2 = Infinity;
		var closest1 = null;
		var closest2 = null;
		for (var i = 0; i < system.particles.length; i++) {
			var currDistance = this.position.dist(system.particles[i].position);
			if (currDistance < minDistance2 && currDistance != 0) {
				if (currDistance < minDistance1) {
					minDistance1 = currDistance;
					closest1 = system.particles[i];
				}
				else {
					minDistance2 = currDistance;
					closest2 = system.particles[i];
				}
			}
		}
		strokeWeight(1);
		stroke("white");
		line(this.position.x, this.position.y, closest1.position.x, closest1.position.y);
		if (p5.Vector.dist(this.position, closest2.position) < maxParticleDistance) {
			line(this.position.x, this.position.y, closest2.position.x, closest2.position.y);
		}
	}
	display() {
		if (!('size' in this)) {
			this.size = Math.floor(Math.random() * (8 - 5)) + 5;
		}
		fill("white");
		strokeWeight(0);
		ellipse(this.position.x, this.position.y, this.size, this.size);
	}
}


  

class ParticleSystem {
	constructor() {
		this.particles = [];
	}
	addParticle(x, y) {
		this.particles.push(new Particle(x, y));
	}
	run() {
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			p.run();
		}
	}
}
  


function drawMoon() {
	push();
	stroke(255);
	fill("#4B4E6D");
	var xPos = sin(frameCount / (rotationDiv / 2)) * orbitalRadius;
	var yPos = -sin(frameCount / (rotationDiv / 2)) * orbitalRadius / 2;

	checkFlip(createVector(xPos, yPos));

	if (moonBehindEarth) {
		ellipse(xPos, yPos, 20, 20);
		//then draw the line in front of the moon
	}

	//earth
	ellipse(0, 0, earthRadius, earthRadius);

	if (!moonBehindEarth) {
		ellipse(xPos, yPos, 20, 20);
	}
	lastMoonPos = createVector(xPos, yPos);
	pop();
}

function checkFlip(moonPos) {
	if (lastMoonPos == null) {
		return;
	}

	var diff = p5.Vector.sub(moonPos, lastMoonPos);
	if ((diff.x > 0 && negSignLastFrame) || (diff.x < 0 && !negSignLastFrame)) {
		print("flipped!");
		moonBehindEarth = !moonBehindEarth;
	}

	negSignLastFrame = diff.x < 0;
}