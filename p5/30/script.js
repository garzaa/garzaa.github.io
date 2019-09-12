var canvasDiameter = 800;

var bg = "#8BD7D2";
var fg = "#FFFBFA";
var hi = "white";
var fmt = 512;
var lineLength = 800;

var waveInterval = 10;
var amplitude = 20;
var song, analyzer;

function preload() {
    song = loadSound("song.mp3");
}

var lines = pointGrid(0, 200, window.innerWidth, window.innerHeight);

function setup() {
    fillWindowCanvas(WEBGL);
    noFill();
    strokeWeight(2);
    song.loop();
    fft = new p5.FFT();
}

function draw() {
    background(bg);
    stroke(fg);

    rotateZ(frameCount / fmt);
    rotateX(frameCount / fmt);
    rotateY(frameCount / fmt);
    
    var waveform = fft.waveform();

    iterateOnLines(lines, function(v) {
       beginShape();
       for (var i=0; i<lineLength; i=Math.min(i+waveInterval, lineLength)) {
            var j = Math.floor(map(i, 0, lineLength, 0, waveform.length));
            var a = waveform[j] * amplitude * computeAmplitudeDecay(j, lineLength);
            vertex(
                v.x + a - canvasDiameter/2,
                v.y - canvasDiameter/2,
                i - lineLength/2
            )
       }
       endShape();
    });
}

// peak in the middle
function computeAmplitudeDecay(i, max) {
    var x = i/max;
    if (x > 1) x = 0;
    return sin(x * PI);
}
