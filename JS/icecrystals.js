var iceCrystals;
var iceNumber;
//spawnrate linked to algae spawn rate
//spawn chance also  linked to algae
//don't need lifetime, these stick around indefinitely

getIceParams();

//no iceAge, har har

function createIce() {
	iceCrystals = iceNumber;
}

function iceSpawn(originalLength) {
	for (var i=0; i<(algaeSpawnRate * originalLength); i++) {
		if (math.random() < algaeSpawnChance) {
			iceCrystals += 1;
		}
	}
}

function iceLife() {
	iceSpawn(algaeArray.length);
}

function resetIceParams() {
	iceCrystals = 0;
	iceNumber = 3;
}