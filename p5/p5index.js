$("li").click(function() {
	var numSketch = parseInt($(this).text().split(" ")[0]);
	loadSketch(numSketch);
});

var currentSketch = 1;
var totalSketches = 1;

$(document).ready(function() {
	totalSketches = $("#sketches").children().length;
	if (window.location.hash) {
		var num = parseInt(window.location.hash.substring(1));
		if (!isNaN(num)) {
			if (num <= totalSketches) {
				loadSketch(num);
			}
		}
	
	}
});

$(document).keypress(function(e) {
	if (e.which == 100) {
		d();
	} else if (e.which == 97) {
		a();
	}
})

function loadSketch(numSketch) {
	currentSketch = numSketch;
	$("#p5sketch").attr("src", numSketch + "/index.html");
	$("li").removeClass("selected-sketch");
	$("#sketches li:nth-child("+numSketch+")").addClass("selected-sketch");
	window.scrollTo(0, 0);
}

$("#d").click(function() {
	d();
})


$("#a").click(function() {
	a();
})

function a() {
	if (currentSketch > 1) {
		loadSketch(currentSketch-1);
	} else {
		loadSketch(totalSketches);
	}
}

function d() {
	if (currentSketch < totalSketches) {
		loadSketch(currentSketch+1);
	} else {
		loadSketch(1);
	}
}