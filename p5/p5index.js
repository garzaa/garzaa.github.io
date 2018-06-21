$("li").click(function() {
	numSketch = parseInt($(this).text().split(" ")[0]);
	$("#p5sketch").attr("src", numSketch + "/index.html");
	$("li").removeClass("selected-sketch");
	$(this).addClass("selected-sketch");
	window.scrollTo(0, 0);
});