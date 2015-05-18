//init audio files
var music = new Audio("sound/1-1.mp3");
var probelaunch = new Audio("sound/probelaunch.mp3");

//MUSIC
if (localStorage.musicPlaying === "playing") {
	music.play();
} else if (localStorage.musicPlaying === "paused") {
	music.pause();
} else {
	localStorage.musicPlaying = "playing";
	music.play();
}

//loops at end, Brian Eno forever
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

//music controls
$("#play").click(function () {
    music.play();
    localStorage.musicPlaying = "playing";
});

$("#pause").click(function () {
    music.pause();
    localStorage.musicPlaying = "paused";
});

//this should only happen once, make sure you don't forget and put it in the HTML
$("#probe").click(function() {
	console.log(document.getElementById("algaeNumber").innerHTML);
	//probelaunch.play();
	getParams();
	probelaunch.currentTime = 0;
	cycle(time);
});

//test params
time = 40;

$("#params").click(function() {
	algaeNumber = prompt("algaeNumber: ");
	algaeSpawnRate = prompt("algaeSpawnRate: ");
	algaeSpawnChance = prompt("algaeSpawnChance: ")
	algaeLifeTime = prompt("algaeLifeTime: ");
	time = prompt("How many months to run for?")
})

function cycle(time) {
	createAlgae();
	for(var i=0; i< time; i++) {
		algaeLife();
	}
	document.getElementById("algaePop").innerHTML = algaeArray.length;
}

function getParams() {
	getAlgaeParams();
}