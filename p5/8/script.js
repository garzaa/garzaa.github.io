var canvasDiameter = 800;
var innerRadius = 400;
var outerRadius = 600;
var numParticles = 1024;
var system;
var speed = .5;

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
	rotate((frameCount/512));
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
};
  
Particle.prototype.display = function() {
	fill("white");
	strokeWeight(0);
	ellipse(this.position.x, this.position.y, 4, 4);
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