	//JustAlgaeThings.js
var algaeArray = [];
var algaeNumber;
var algaeSpawnRate;
var algaeSpawnChance;
var algaeLifeTime;
var algaeArray;
getLocalStorage();

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
	for (var i=0; i<algaeNumber; i++) {
		algaeArray.push(0);
	}

}

function algaeSpawn(originalLength) {
	for (var i=0; i<originalLength; i++) {
		if (Math.random() < algaeSpawnChance) {
			algaeArray.push(0);
		}
	}
}

function algaeLife() {
	algaeAge();
	algaeSpawn(algaeArray.length);
}

function resetAlgaeParams() {
	algaeNumber = 3;
	algaeSpawnRate = 3;
	algaeSpawnChance = 0.06;
	algaeLifeTime = 20;
	algaeArray = [];
}

function getAlgaeParams() {
	algaeNumber = document.getElementById("algaeNumber").innerHTML;
	algaeSpawnRate = document.getElementById("algaeSpawnRate").innerHTML;
	algaeSpawnChance = document.getElementById("algaeSpawnChance").innerHTML;
	algaeLifeTime = document.getElementById("algaeLifeTime").innerHTML;
	cycles = document.getElementById("cycles").innerHTML;
}