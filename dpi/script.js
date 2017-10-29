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

var game =  {
	indulgences: 0,
	ips: 0
}