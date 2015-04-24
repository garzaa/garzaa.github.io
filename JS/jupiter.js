//init audio files
var music = new Audio("sound/1-1.mp3");
var probelaunch = new Audio("sound/probelaunch.mp3");

//music playing based on whether it's been paused before
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
})

$("#pause").click(function () {
    music.pause();
    localStorage.musicPlaying = "paused";
})

$("#probe").click(function() {
	probelaunch.play();
	probelaunch.currentTime = 0;
})

