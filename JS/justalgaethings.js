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

/*function algaeSpawn() {
	console.log("algae should spawn here...");
	for (var i=0; i<algaeArray.length; i++) {
		algaeArray.push(0);
	}
}*/

function algaeLife() {
	algaeAge();
	//tHIS WILl COME LATER
	//algaeSpawn();
	console.log(algaeArray);
}