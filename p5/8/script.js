var canvasDiameter = 800;
var innerRadius = 400;
var outerRadius = 600;
var numParticles = 36;
var system;
var speed = 0.05;
var rotationDiv = 1024;

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
	noFill();
	stroke("white");
	ellipse(0, 0, 150, 150);
	rotate((frameCount/rotationDiv));

	//moon and orbital path
	push()
	rotate(-(frameCount/rotationDiv) / 2);
	ellipse(0, 0, 240, 240);
	fill("#4B4E6D")
	ellipse(120, 0, 20, 20);
	pop();

	//stars
	system.run();
}

var Particle = function(x, y) {
	this.velocity = createVector(random(-1, 1), random(1, -1)).mult(speed);
	this.position = createVector(x, y);
};

Particle.prototype.run = function() {
	this.update();
	this.display();
};

Particle.prototype.update = function(){
	if (dist(this.position.x, this.position.y, 0, 0) > outerRadius/2 
		|| dist(this.position.x, this.position.y, 0, 0) < innerRadius/2) {
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
	for (var i=0; i<system.particles.length; i++) {
		var currDistance = this.position.dist(system.particles[i].position);
		if (currDistance < minDistance2 && currDistance != 0) {
			if (currDistance < minDistance1) {
				minDistance1 = currDistance;
				closest1 = system.particles[i];
			} else {
				minDistance2 = currDistance;
				closest2 = system.particles[i];
			}
		}
	}
	strokeWeight(1);
	stroke("white");
	line(this.position.x, this.position.y, closest1.position.x, closest1.position.y);
	//line(this.position.x, this.position.y, closest2.position.x, closest2.position.y);
};
  
Particle.prototype.display = function() {
	if (!('size' in this)) {
		this.size = Math.floor(Math.random() * (7 - 3)) + 3;
	}
	fill("white");
	strokeWeight(0);
	ellipse(this.position.x, this.position.y, this.size, this.size);
};

var ParticleSystem = function() {
	this.particles = [];
};
  
ParticleSystem.prototype.addParticle = function(x, y) {
	this.particles.push(new Particle(x, y));
};

ParticleSystem.prototype.run = function() {
	for (var i=0; i<this.particles.length; i++) {
		var p = this.particles[i];
		p.run();
	}
};
