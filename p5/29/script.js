var canvasDiameter = 800;

var bg = "#8fd3f4";
var fg = "#84fab0";
var hl = "#7D53DE"
var fmt = 128;
var gradHeight = 200;
var htmlCanvas;

function setup() {
    createCanvas(canvasDiameter, canvasDiameter, WEBGL);
}

function draw() {
    background(bg);

    normalMaterial();

    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    torus(200, 40);
    translate(0, 200);

    rotateZ(frameCount * -0.02);
    rotateX(frameCount * -0.02);
    rotateY(frameCount * -0.02);
    torus(200, 40);
}