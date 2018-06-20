$("li").click(function() {
	numSketch = parseInt($(this).text());
	$("#p5sketch").attr("src", numSketch + "/index.html");
	window.scrollTo(0, 0);
});