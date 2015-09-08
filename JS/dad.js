var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var entryway = document.getElementById("entryway");

function drawEntryway() {
	ctx.drawImage(entryway, 0, 0, 800, 600) //img,x,y,width,height
}

//before gamecode
//test

drawEntryway();