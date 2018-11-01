var radius = 400;
var canvasDiameter = 600;

var offWhite = 'rgba(240, 240, 255, 0.5)'

var w = window.innerWidth;
var h = window.innerHeight;

var leftParticles = []
var rightParticles = []

var lastMousePos = null;

var pixelsPerParticle = 10;
var maxParticleDistance = 60;
var minParticleDistance = 10;
var particleLifetime = 240;

var cDistance = 0;

function setup() {
    var cnv = createCanvas(w, h);
	cnv.parent("canvas-container")
	lastMousePos = createVector(mouseX, mouseY);
}

function draw() {
    background('#255ed5');
	stroke(offWhite);
	strokeWeight(3);
	noFill();

	var currMousePos = createVector(mouseX, mouseY);
	var mouseDistance = currMousePos.dist(lastMousePos);
	if (mouseDistance > pixelsPerParticle || (cDistance > pixelsPerParticle)) {
		cDistance = 0
		createParticlePair(currMousePos, p5.Vector.sub(lastMousePos, currMousePos).normalize());
	} else {
		cDistance += mouseDistance;
	}

	lastMousePos = currMousePos;

	runParticles(leftParticles);
	runParticles(rightParticles);
}

function createParticlePair(posVec, dirVec) {
	dirVec.normalize();
	leftParticles.push(new Particle(posVec, dirVec.rotate(PI), leftParticles));
	//rightParticles.push(new Particle(posVec, dirVec.rotate(PI), rightParticles));
}

class Particle {
	constructor(posVec, dirVec, otherParticles) {
		this.otherParticles = null;
		this.lifetime = particleLifetime;
		this.velocity = dirVec;
		this.position = posVec;
		this.otherParticles = otherParticles;
	}

	update() {
		this.position.add(this.velocity);

		var closest = [];
		for (var i = 0; i < this.otherParticles.length; i++) {
			var currDistance = this.position.dist(this.otherParticles[i].position);
			if (currDistance < maxParticleDistance && currDistance != 0) {
				closest.push(this.otherParticles[i])
			}
		}

		if (closest.length == 0) {
			var closestParticle = null;
			var maxDistance = Infinity;
			this.otherParticles.forEach(i => {
				var d = this.position.dist(i.position);
				if (d < maxDistance && i.closest != this && d > minParticleDistance) {
					closestParticle = i;
					maxDistance = d;
				}
			})
			if (closestParticle != null) {
				closest.push(closestParticle);
			}
		}

		strokeWeight(1);

		closest.forEach(i => {
			line(this.position.x, this.position.y, i.position.x, i.position.y);
			ellipse(this.position.x, this.position.y, 3, 3);
		});

		this.lifetime--;
	}

	display() {
		fill("white");
		strokeWeight(0);
	}

	run() {
		this.update();
		this.display();
	}
}

function runParticles(particleArray) {
	var toSplice = []
	for (var i=0; i<particleArray.length; i++) {
		particleArray[i].run();
		if (particleArray[i].lifetime < 0) {
			toSplice.push(i);
		}
	}

	toSplice.forEach(index => {
		particleArray.splice(index, 1);
	});
}