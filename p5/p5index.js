$("li").click(function() {
	var numSketch = parseInt($(this).text().split(" ")[0]);
	loadSketch(numSketch);
});

var currentSketch = 1;
var totalSketches = 1;

$(document).ready(function() {
	totalSketches = $("#sketches").children().length;
});

$(document).keypress(function(e) {
	console.log(e.which);
	if (e.which == 100) {
		//D
		if (currentSketch < totalSketches) {
			loadSketch(currentSketch+1);
		} else {
			loadSketch(1);
		}
	} else if (e.which == 97) {
		//A
		if (currentSketch > 1) {
			loadSketch(currentSketch-1);
		} else {
			loadSketch(totalSketches);
		}
	}
})

function loadSketch(numSketch) {
	currentSketch = numSketch;
	$("#p5sketch").attr("src", numSketch + "/index.html");
	$("li").removeClass("selected-sketch");
	$("#sketches li:nth-child("+numSketch+")").addClass("selected-sketch");
	window.scrollTo(0, 0);
}