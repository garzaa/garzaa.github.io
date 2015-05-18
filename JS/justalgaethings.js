	//JustAlgaeThings.js
var algaeNumber = 3;
var algaeSpawnRate = 3;
var algaeLifeTime = 12;
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
	
	for (var i=0; i<algaeNumber; i++) {
		algaeArray.push(0);
	}
	console.log("populated array...");

}

function algaeSpawn(originalLength) {
	console.log("algae should spawn here...");
	for (var i=0; i<originalLength; i++) {
		algaeArray.push(0);
	}
}

function algaeLife() {
	algaeAge();
	algaeSpawn(algaeArray.length); //okay why does this crash Chrome
	console.log(algaeArray);
}