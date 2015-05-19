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

function iceSpawn(algaeFails) {
	iceCrystals += algaeFails;
	//could add more here depending on climate, etc
}

function iceLife() {
	createIce();
	iceSpawn(algaeArray.length);
}

function resetIceParams() {
	iceCrystals = 0;
	iceNumber = 3;
}

function getIceParams() {
	iceNumber = document.getElementByID("iceNumber").innerHTML;
}