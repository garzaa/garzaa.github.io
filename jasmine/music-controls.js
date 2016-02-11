//library
var Satellite = {title:"Satellite",artist:"Guster",src:"Satellite.mp3",}
var Paris = {title:"Paris",artist:"Geographer",src:"Paris.mp3",}
var TheEnemy = {title:"The Enemy",artist:"Andrew Belle",src:"The Enemy.mp3",}
var Oceans = {title:"Oceans",artist:"Seafret",src:"Oceans.mp3",}
var Kettering = {title:"Kettering",artist:"The Antlers",src:"Kettering.mp3",}
var SimpleSong = {title:"Simple Song",artist:"The Shins",src:"Simple Song.mp4",}
var July4 = {title:"Fourth Of July",artist:"Sufjan Stevens",src:"Fourth Of July.m4a",}
var TheWispSings = {title:"The Wisp Sings",artist:"Winter Aid",src:"The Wisp Sings.mp3",}

var songs = [
	Satellite,
	Paris,
	SimpleSong,
	TheEnemy,
	Oceans,
	Kettering,

	July4,
	TheWispSings,
]


var firstClick = true
var playing = false	
currentSong = new Audio(songs[0].src)
songObj = songs[0]

function play(trackNumber) {
	firstClick = false;
	playing = true;
	trackDuration = currentSong.duration;
	document.getElementById("pause").innerHTML = "[pause]"
	track = trackNumber;
	currentSong.pause();
	currentSong.currentTime = 0;
	songObj = songs[trackNumber]
	currentSong = new Audio(songs[trackNumber].src);
	console.log("playing " + songObj.title);
	currentSong.play();
	currentSong.onended = function() {
		if (track != songs.length-1) {
			play(track + 1);
		}
	}

	//update title info
	document.getElementById("song-name").innerHTML = songObj.title;
	document.getElementById("artist-name").innerHTML = songObj.artist;
}



$("#pause").click(function() {
	if (firstClick === true) {
		play(0);
		firstClick = false;
		console.log("first click")
	} else if (playing) {
		currentSong.pause();
		playing = false;
		document.getElementById("pause").innerHTML = "[play]"
	} else {
		currentSong.play();
		playing = true;
		document.getElementById("pause").innerHTML = "[pause]"
	}
})

$("#next").click(function() {
	//loop if at the end
	if (track != songs.length-1) {
			play(track + 1);
		} else { play(0); }
})

$("#prev").click(function() {
		if (currentSong.currentTime > 3) { //rewinds if in the middle of a song
			currentSong.currentTime = 0;
		} else if (track === 0) {
				play(songs.length-1);
		} else { play(track - 1); }
})

function updateTrackbar() {
	var percent = (currentSong.currentTime / currentSong.duration) * 100
	percent += "%"
	$("#trackbar").css("width", percent)
}

setInterval(updateTrackbar, 20)


//MUSIC CONTROLS WOO

$("#song1").click(function() {
	play(0);
})

$("#song2").click(function() {
	play(1);
})

$("#song3").click(function() {
	play(2);
})

$("#song4").click(function() {
	play(3);
})

$("#song5").click(function() {
	play(4);
})

$("#song6").click(function() {
	play(5);
})

$("#song7").click(function() {
	play(6);
})

$("#song8").click(function() {
	play(7);
})