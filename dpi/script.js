$(document).ready(function() {

})

$("#main-button").click(function() {
	indulge();
})

function indulge() {
	game.indulgences++;
	$("#indulgences").text(game.indulgences);
}

var game =  {
	indulgences: 0
}