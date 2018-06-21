function getCanvas(canvasNum) {
	canvasNum = canvasNum || 0;
	return document.getElementById('defaultCanvas'+canvasNum);
}

function linearGradient(x0, y0, x1, y1, w, h, startColor, endColor, canvasNum) {
	var canvas = getCanvas(canvasNum);
	var ctx = canvas.getContext("2d");

	var gradient = ctx.createLinearGradient(x0, y0, x1, y1);
	gradient.addColorStop(0, startColor);
	gradient.addColorStop(1, endColor);
	ctx.fillStyle = gradient;
	ctx.fillRect(x0, y0, w, h);
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