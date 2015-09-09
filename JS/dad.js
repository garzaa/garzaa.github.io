var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var entryway = document.getElementById("entryway");

function drawEntryway() {
	ctx.drawImage(entryway, 0, 0, 800, 600) //img,x,y,width,height
}


/* PLAYER CONTROLLER */

var dadWidth = 320
var dadHeight = 640

var dx = 0
var movePerFrame = 4

function dad(x) {

	this.xLocation = x

  	this.xBottom = this.xLocation + 320

  	this.standL = document.getElementById("stand-l")
  	this.walkL1 = document.getElementById("walk-l1")
  	this.walkL2 = document.getElementById("walk-l2")
  	this.standR = document.getElementById("stand-r")
  	this.walkR1 = document.getElementById("walk-r1")
  	this.walkR2 = document.getElementById("walk-r2")

  	this.direction = "L"
}

function paintDad(dadObj) {
	if (this.direction === "L") {
		ctx.drawImage(dadObj.standL, dadObj.xLocation, 0)
	} else if (this.direction === "R") {
		ctx.drawImage(dadObj.standR, dadObj.xLocation, 0)
	}

	console.log("drew a dad")
}

//before gamecode
//test

var dad = new dad(400)

drawEntryway();
paintDad(dad)
