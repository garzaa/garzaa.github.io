var radius = 400;

var bg = 220
var fg = 50

var w = 800;
var h = 800;
var margin = 200;
var mean = 0;
var sd = 0.5;

var particleInterval = 10;
var minParticleDistance = 10;
var maxParticleDistance = 200;
var particleLifetime = 100;

var particleArray = [];

function setup() {
    createCanvas(w, h);
	lastMousePos = createVector(mouseX, mouseY);
	background(bg);
	fill(fg);
	particleArray = [];
	stroke(fg);
	strokeWeight(1);
}

function draw() {
	background(bg);
	translate(w/2, h/2);
	rotate(sin(frameCount/256) * HALF_PI)
	runParticles();

	if (frameCount % particleInterval == 0) {
		createParticle();
	}
}

function createParticle() {
	var posX = random(-(w/2) + margin, (w/2) - margin);
	var posY = random(-(h/2) + margin, (h/2) - margin);
	posVec = createVector(posX, posY);

	var dirX = randomGaussian(mean, sd);
	var dirY = randomGaussian(mean, sd);
	dirVec = createVector(dirX, dirY);

	particleArray.push(new Particle(posVec, dirVec, particleArray));
}

class Particle {
	constructor(posVec, dirVec, otherParticles) {
		this.otherParticles = null;
		this.lifetime = particleLifetime;
		this.velocity = dirVec;
		this.position = posVec;
		this.otherParticles = otherParticles;
		this.fillColor = randomGaussian(fg, 10);
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

		closest.forEach(i => {
			line(this.position.x, this.position.y, i.position.x, i.position.y);
		});

		fill(this.fillColor);
		if (closest.length > 1) {
			triangle(
				this.position.x, this.position.y,
				closest[0].position.x, closest[0].position.y,
				closest[1].position.x, closest[1].position.y
			)			
		}

		this.lifetime--;
	}

	display() {
		//ellipse(this.position.x, this.position.y, 3, 3);
	}

	run() {
		this.update();
		this.display();
	}
}

function runParticles() {
	var toSplice = []
	for (var i=0; i<particleArray.length; i++) {
		particleArray[i].run();
		if (particleArray[i].lifetime < 0) {
			// avoid modifying in place
			toSplice.push(i);
		}
	}

	toSplice.forEach(index => {
		particleArray.splice(index, 1);
	});
}