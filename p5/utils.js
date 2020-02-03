var drawRoutines = [];

function scaleWaveform(point, amplitude) {
    return logTransform(point, 0, 1, 0, amplitude);
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

class PointGrid {
    constructor(
        outsideMargin,
        pointGap,
        fieldSizeX,
        fieldSizeY,
        offset
    ) {
        this.points = [];
        this.occupiedPoints = [];
        offset = offset || {x: 0, y: 0};
        for (var i=outsideMargin + (pointGap % fieldSizeY) / 2; i<fieldSizeY-outsideMargin; i+=pointGap) {
            var tempPoints = [];
            var tempOccupiedPoints = [];
            for (var j=outsideMargin + (pointGap % fieldSizeX) / 2; j<fieldSizeX-outsideMargin; j+=pointGap) {
                var currPoint = {
                    x: i + offset.x,
                    y: j + offset.y
                };
                tempPoints.push(currPoint);
                tempOccupiedPoints.push(false);
            }
            this.points.push(tempPoints);
            this.occupiedPoints.push(tempOccupiedPoints);
        }
    }

    iterateOnPoints(callback) {
        for (var i=0; i<this.points.length; i++) {
            for (var j=0; j<this.points.length; j++) {
                var currPoint = this.points[i][j];
                callback(currPoint);
            }
        } 
    }

    occupy(x, y) {
        this.occupiedPoints[x][y] = true;
    }

    vacate(x, y) {
        this.occupiedPoints[x][y] = false;
    }

    getPosition(p) {
        return this.points[p.y][p.x];
    }

    isOccupied(x, y) {
        return this.occupiedPoints[x][y] === true;
    }

    getEmptyPoint() {
        var visitedY = [];
        while (visitedY.length < this.points.length) {
            var tempY = randomInt(this.points.length);
            if (visitedY.includes(tempY)) {
                continue;
            }
            visitedY.push(tempY);
            var visitedX = [];
            while (visitedX.length < this.points[tempY].length) {
                var tempX = randomInt(this.points[tempY].length);
                if (visitedX.includes(tempX) || this.occupiedPoints[tempX][tempY] === true) {
                    visitedX.push(tempX);
                    continue;
                }
                this.occupiedPoints[tempX][tempY] = true;
                return createVector(tempX, tempY);
            }
        }
    
        return null;
    }

    randomPoint() {
        return randomChoice(randomChoice(this.points));
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

function randomPlusOrMinus(variance) {
    return Math.round(-variance + (Math.random() * variance * 2));
}

function xor(a, b) {
    return ( a || b ) && !( a && b ); 
}

// inclusive
function intRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawLineAtSpeed(start, end, speed, callback) {
    // gotta insert this into the draw loop somehow
    drawRoutines.push(new DrawRoutine(
        {
            start: start,
            end: end,
            speed: speed
        }
    ));

    // don't overshoot it
}

function exclusiveIntRange(min, max) {
    return intRange(min+1, max-1);
}

class DrawRoutine {
    constructor(params, fn) {
        this.params = params;
        this.fn = fn;
    }

    update() {
        this.fn(params);
    }

    //also: what happens when it finishes
}

// bad
function updateDrawRoutines() {
    drawRoutines.forEach(x => x.update());
}

function randomBool() {
    return Math.random() >= 0.5;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}