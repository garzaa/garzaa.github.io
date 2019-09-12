function pointGrid(
    outsideMargin,
    pointGap,
    fieldSizeX,
    fieldSizeY
) {
    var points = [];
    for (var i=outsideMargin + (pointGap % fieldSizeY) / 2; i<fieldSizeY-outsideMargin; i+=pointGap) {
		tempPoints = [];
		for (var j=outsideMargin + (pointGap % fieldSizeX) / 2; j<fieldSizeX-outsideMargin; j+=pointGap) {
			var currPoint = {
				x: i,
				y: j
			};
			tempPoints.push(currPoint);
		}
		points.push(tempPoints);
    }
    return points;
}

function scaleWaveform(point, amplitude) {
    return logTransform(point, 0, 1, 0, amplitude);
}

function iterateOnLines(lineGrid, callback) {
    for (var i=0; i<lineGrid.length; i++) {
        for (var j=0; j<lineGrid.length; j++) {
            var currPoint = lines[i][j];
            callback(currPoint);
        }
    }
}

function fillWindowCanvas(rendermode) {
    return createCanvas(window.innerWidth, window.innerHeight, rendermode);
}

function timeLerp(variableNameString, to, seconds, callback) {
	var startFrameCount = frameCount;
    var duration = frameRate() * seconds;
    var isColor = typeof(window[variableNameString]) === "string";
    var from;
    if (isColor) {
        from = color(window[variableNameString]);
        to = color(to);
    } else {
        from = window[variableNameString];
    }
	var i = setInterval(
		function() {
            var frac = (frameCount - startFrameCount) / duration;
            console.log(frac);
            if (frac > 1) {
                clearInterval(i);
                if (callback != undefined) {
                    callback();
                }
                return;
            }
            if (isColor) {
                window[variableNameString] = lerpColor(from, to, frac);
            } else {
                window[variableNameString] = lerp(from, to, frac);
            }
		},
		50
	)
}
