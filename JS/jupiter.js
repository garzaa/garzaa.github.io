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

//init population variables

var algae = 25; //initial number of algae
var algaeSpawnRate = 4; //four new plants per cycle per plant
var algaeLifeTime = 4; //number of cycles it takes for algae to die off
var algaeArray = [];
var time = 0;


//music controls
$("#play").click(function () {
    music.play();
    localStorage.musicPlaying = "playing";
})

$("#pause").click(function () {
    music.pause();
    localStorage.musicPlaying = "paused";
})

$("#probe").click(function() {
	probelaunch.play();
	probelaunch.currentTime = 0;
	cycle(time);
})

//test params
var algaeNumber = 3;
var algaeSpawnRate = 3;
var algaeLifeTime = 3;
time = 12;

$("#params").click(function() {
	algaeNumber = prompt("algaeNumber: ");
	algaeSpawnRate = prompt("algaeSpawnRate: ");
	algaeLifeTime = prompt("algaeLifeTime: ");
	time = prompt("How many months to run for?")
})

function cycle(time) {
	createAlgae();
	for(var i=0; i< time; i++) {
		console.log("700 Jovian hours have passed...")
		algaeLife();
	}
	alert("Current algae population: " + algaeArray.length);
}