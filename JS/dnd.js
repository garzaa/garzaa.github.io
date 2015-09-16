function rollDie(sides) {
	var outcome = Math.floor(Math.random() * sides) + 1 
	document.getElementById("roll-outcome").innerHTML = outcome
}

$("#d4").click(function() {
	rollDie(4);
})

$("#d6").click(function() {
	rollDie(6);
})

$("#d8").click(function() {
	rollDie(8);
})

$("#d10").click(function() {
	rollDie(10);
})

$("#d12").click(function() {
	rollDie(12);
})

$("#d20").click(function() {
	rollDie(20);
})