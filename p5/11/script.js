var canvasDiameter = 800;

var bg = "#14BDEB"

//3d perlin noise 👌
var xoff = 0.0;
var yoff = 0.0;
var zoff = 0.0;

var numShapes = 8;
var shapeWidth = 600;
var shapeHeight = 100;
var newOffset = .005;

function setup() {
    createCanvas(canvasDiameter, canvasDiameter);
}

function draw() {
    var upperColor = color("#fff");
    var lowerColor = color("#14BDEB");

    background(bg);
    translate(canvasDiameter/2, canvasDiameter/2);

    //update perlin noise
    yoff -= newOffset;
    xoff += newOffset / 10;
    
    //total width:  shapeWidth;
    push()
    translate(-shapeWidth/2, 150);
    
    strokeWeight(0);

    for (var i=0; i<numShapes; i++) {
        push();
        fill(lerpColor(upperColor, lowerColor, i/numShapes));

        beginShape();
        //we want the same yoff for each row
        var newYoff = yoff;
        var heights = [];
        for (var j=0; j<=shapeWidth; j++) {
            //shape height should be 0 at the edges
            //multiply by sin(j)
            var y = cos((shapeWidth/2 - j) / (shapeWidth/(PI)));
            var currHeight = (noise(newYoff+.01 * j) * 4) * y * noise(xoff + i/16);
            var normalizedHeight = -shapeHeight * currHeight/(i);
            heights.push(normalizedHeight)
        }

        console.log(heights);

        for (var j=0; j<heights.length; j++) {
            vertex(j, heights[j]);
        }
        for (var j=heights.length-1; j>=0; j--) {
            //vertex(j, -heights[j]);
        }
        vertex(shapeWidth/2, 0);
        vertex(-shapeWidth/2, 0);

        endShape(CLOSE);
        pop();

        zoff += 0.001 * i;
    }
    pop();

    push();
    rectMode(RADIUS);
    strokeWeight(4);
    stroke("rgba(255, 255, 255, 1)");
    noFill();
    rect(0, 0, 302, 150);
    pop();
}