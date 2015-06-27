//JustAlgaeThings.js
var algaeArray = [];
var algaeNumber;
var algaeSpawnRate;
var algaeSpawnChance;
var algaeLifeTime;
var algaeFails;

getAlgaeParams();

function algaeAge() {
	for (var i=0; i<algaeArray.length; i++) {
		algaeArray[i] += 1;
		if (algaeArray[i] > algaeLifeTime) {
			algaeArray.splice(i, 1);
		}
	}
}

function createAlgae() {
	algaeArray = []; 
	// ^^ seems redundant but this empties the prev array
	for (var i=0; i<algaeNumber; i++) {
		algaeArray.push(0);
	}

}

function algaeSpawn(originalLength) {
	algaeFails = 0; //gotta do this for each cycle
	for (var i=0; i<(algaeSpawnRate*originalLength); i++) {
		if (Math.random() < algaeSpawnChance) {
			algaeArray.push(0);
		} else {
			iceSpawn(1);
		}
	}
}

function algaeLife() {
	algaeAge();
	algaeSpawn(algaeArray.length);
}

function resetAlgaeParams() {
	algaeArray = [];
	algaeNumber = 3;
	algaeSpawnRate = 3;
	algaeSpawnChance = 0.06;
	algaeLifeTime = 20;
	algaeFails = 0;
}

function getAlgaeParams() {
	algaeNumber = document.getElementById("algaeNumber").innerHTML;
	algaeSpawnRate = document.getElementById("algaeSpawnRate").innerHTML;
	algaeSpawnChance = document.getElementById("algaeSpawnChance").innerHTML;
	algaeLifeTime = document.getElementById("algaeLifeTime").innerHTML;
	cycles = document.getElementById("cycles").innerHTML;
}

function updateAlgae() {
	document.getElementById("algaePop").innerHTML = algaeArray.length;
}