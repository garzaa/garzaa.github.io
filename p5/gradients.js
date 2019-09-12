var ctx;

function getCanvas(canvasNum) {
	canvasNum = canvasNum || 0;
	return document.getElementById('defaultCanvas'+canvasNum);
}

function linearGradient(x0, y0, x1, y1, w, startColor, endColor, canvasNum) {
	canvasNum = canvasNum || "0";
	var canvas = getCanvas(canvasNum);
	ctx = canvas.getContext("2d");

	//this is actually just a really thick line
	ctx.lineWidth = w;
	ctx.lineCap = "square";

	var grad = ctx.createLinearGradient(x0, y0, x1, y1);
	grad.addColorStop(0, startColor);
	grad.addColorStop(1, endColor);

	ctx.strokeStyle = grad;

	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);

	ctx.stroke();
}

function radialGradient(x, y, radius, innerColor, outerColor, canvasNum) {
	var canvas = getCanvas(canvasNum);
	var ctx = canvas.getContext('2d');
	var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

	gradient.addColorStop(0, innerColor);
	gradient.addColorStop(1, outerColor);
	ctx.fillStyle = gradient;
	ctx.fillRect(x-radius, y-radius, 2*radius, 2*radius);
}