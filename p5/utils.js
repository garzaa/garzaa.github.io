function pointGrid(
    outsideMargin,
    pointGap,
    fieldSizeX,
    fieldSizeY,
    offset
) {
    var points = [];
    offset = offset || {x: 0, y: 0};
    for (var i=outsideMargin + (pointGap % fieldSizeY) / 2; i<fieldSizeY-outsideMargin; i+=pointGap) {
		tempPoints = [];
		for (var j=outsideMargin + (pointGap % fieldSizeX) / 2; j<fieldSizeX-outsideMargin; j+=pointGap) {
			var currPoint = {
				x: i + offset.x,
				y: j + offset.y
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

function iterateOnPoints(pointGrid, callback) {
    for (var i=0; i<pointGrid.length; i++) {
        for (var j=0; j<pointGrid.length; j++) {
            var currPoint = pointGrid[i][j];
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

function bindBoolToKey(boolName, keyName) {
    document.addEventListener("keydown", function(e) {
        if (e.key == keyName) {
            window[boolName] = !window[boolName];
        }
    })
}

function bindBoolToKeyPress(boolName, keyName) {
    console.log("added");
    document.addEventListener("keydown", function(e) {
        console.log(e.key);
        if (e.key == keyName) {
            window[boolName] = true;
        }
    })

    document.addEventListener("keyup", function(e) {
        if (e.key == keyName) {
            window[boolName] = false;
        }
    }) 
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle(p) {
        this.particles.push(p);
    }

    run() {
        for (var i=0; i<this.particles.length; i++) {
            this.particles[i].run();
        }
    }
}

class Particle {
    run() {
       this.update();
       this.display(); 
    }

    update() {

    }

    display() {

    }
}

function rangeIter(range, fn) {
    for (var x=0; x<range; x++) {
        fn(x);
    }
}

function randomChoice(arr) {
    return arr[randomInt(arr.length)]
}

function randomInt(ceil) {
    return Math.floor(Math.random() * ceil);
}