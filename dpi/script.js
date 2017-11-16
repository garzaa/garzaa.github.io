$(document).ready(function() {
	var ipsIncrementer = setInterval(function() {
		game.indulgences += game.ips;
		updateIndulgences();
	}, 1000)
})

$("#main-button").click(function() {
	indulge();
})

function updateIndulgences() {
	$("#indulgences").text(game.indulgences);
}

function indulge() {
	game.indulgences++;
	updateIndulgences();
}

var game = {
	indulgences: 0,
	ips: 0,
	ownedUpgrades: []
}

function applyEffect(o) {
	//for every key in effects
	//if possible effects has a function with that name, call that function with the value
	for (var effect in o.effects) {
		if (o.effects.hasOwnProperty(effect) && effects.includes(effect)) {

		}
	}
}