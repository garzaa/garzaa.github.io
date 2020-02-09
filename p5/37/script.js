var canvasSize = 800;
var outsideMargin = 250;
var pointGap = 18;
var fieldSize = canvasSize - (2*outsideMargin);

var points;

var img;

function preload() {
    img = loadImage("bg.png");
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    points = new PointGrid(
        0,
        pointGap,
        fieldSize,
        fieldSize,
        {x:outsideMargin, y:outsideMargin}
    )

    stroke(200);
    noFill();
}

function draw() {
    image(img, 0, 0, 800, 800);

    points.iterateOnPoints(function(p) {
        var xOff = p.x + sin(frameCount/32 + (p.x+p.y))*2;
        var yOff = p.y + cos(frameCount/32 + (p.x+p.y))*2;
        ellipse(xOff, yOff, 1, 1);
    });
}