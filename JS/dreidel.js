//init game logic variables
var numPlayers = 0;
var numAi = 0;
var player1 = 0;
var player2 = 0
var com1 = 0
var com2 = 0;
var currentScreen = "splashscreen";

function goToScreen(screenId) {
	hideAll();
	//document.getElementById("players").style.opacity = "0";
	console.log(screenId);
	document.getElementById(screenId).style.opacity = "100";
	var newScreen = "#" + screenId;
	$(newScreen).show();
	currentScreen = screenId;
}

function beginGame1p() {
	numPlayers = 1;
	goToScreen("players");
	customizePlayers();
}

function beginGame2p() {
	numPlayers = 2;
	goToScreen("players");
	customizePlayers();
}

//loads game screens based on numPlayers
function customizePlayers() {
	if (numPlayers == 1) {
		document.getElementById("playersTitle").innerHTML = "SOLO PLAY";
	} else {
		document.getElementById("playersTitle").innerHTML = "SUDDEN DEATH";
	}
}

function hideAll() {
	$("#splashscreen").hide();
	$("#game").hide();
	$("#about").hide();
	$("#customize").hide();
	$("#players").hide();
}

function goToSplash() {
	hideAll();
	$("#splashscreen").show();
	currentScreen = "splashscreen"
}

function goToAbout() {
	goToScreen("about");
	currentScreen = "about";	
}

function goToGame() {
	goToScreen("game");
	currentScreen = "game";
}

//game logic goes down here

var gameHappening = false;
var currentPlayer = "PLAYER 1";
var pot = 0;
var playerArray = [];
var spin = 0;
var result = ""


//click functions for players and coms
$("#1com").click(function() {
	numAI = 1;
	goToGame();
});

$("#2com").click(function() {
	numAI = 2;
	goToGame();
})

function printResult(resultString) {
	document.getElementById("results").innerHTML = resultString;
}

function turn() {
	spin = Math.floor(Math.random() * 4) 
	switch(spin) {
		case 0:
			result="nun";
			break;
		case 1: 
			result="gimmel";
			break;
		case 2:
			result="hey";
			break;
		case 3:
			result="shim";
			break;
	}
	printResult(result);
}