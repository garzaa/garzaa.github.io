	//JustAlgaeThings.js
var algaeNumber = 3;
var algaeSpawnRate = 3;
var algaeSpawnChance = .06;
var algaeLifeTime = 20;
var algaeArray = [];

function algaeAge() {
	for (var i=0; i<algaeArray.length; i++) {
		algaeArray[i] += 1;
		if (algaeArray[i] > algaeLifeTime) {
			algaeArray.splice(i, 1);
		}
	}
}

function createAlgae() {
	
	console.log("Creating algae array...")
	algaeArray = [];
	for (var i=0; i<algaeNumber; i++) {
		algaeArray.push(0);
	}
	console.log("populated array...");

}

function algaeSpawn(originalLength) {
	console.log("algae should spawn here...");
	for (var i=0; i<originalLength; i++) {
		if (Math.random() < algaeSpawnChance) {
			algaeArray.push(0);
		}
	}
}

function algaeLife() {
	algaeAge();
	algaeSpawn(algaeArray.length);
	console.log(algaeArray);
}

function resetAlgaeParams() {
	algaeNumber = 3;
	algaeSpawnRate = 3;
	algaeSpawnChance = .06;
	algaeLifeTime = 20;
	algaeArray = [];
}

function getAlgaeParams() {
	algaeNumber = document.getElementById("algaeNumber");
	algaeSpawnRate = document.getElementById("algaeSpawnRate");
	algaeSpawnChance = document.getElementById("algaeSpawnChance");
	algaeLifeTime = document.getElementById("algaeLifeTime");
	time = document.getElementById("time");
}


