//dice
function d(sides) {	
	return Math.floor(Math.random() * sides) + 1
}

//enemy objects
function lap()

$("#lap").click(function() {
	createLap()
})