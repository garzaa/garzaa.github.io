//JustAlgaeThings.js
function algaeAge(algaeArray, algaeLifeTime) {
	for (var i=0; i<algaeNumber; i++) {
		algaeArray[i] += 1;
		if (algaeArray[i] > algaeLifeTime) {
			algaeArray.splice(i, 1);
		}
	}
}

function createAlgae() {
	
	console.log("Creating algae array...")
	//if algae hasn't already been created
	//creates an array, assigns a number to it for the number of cycles old algae is
	var algaeArray = []
	for (var i=0; i<algaeNumber; i++) {
		algaeArray[i] = 1;
	}
	console.log(algaeArray);
	console.log("populated array...");

}

function algaeLife() {
	algaeAge();
}