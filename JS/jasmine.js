var songs = [
			"../music/revelinyourtime.mp3",
			"../music/pinkmist.mp3",
			"../music/parallel.mp3",
			"../music/masquerade.mp3",
			"../music/underyourspell.mp3",
			"../music/nightcall.m4a",
			"../music/desire.mp3"
			];

//var currentsong = new Audio(songs[0]);
var track = 0;

function play(trackNumber) {
	track = trackNumber;
	var currentsong = new Audio(songs[trackNumber]);
	currentsong.play();
	currentsong.onended = function() {
		if (track != songs.length-1) {
			play(track + 1);
		} else { play(0); }
	}
	console.log(currentsong);
}

$("#revelinyourtime").click(function() {
	play(0);
})

$("#pinkmist").click(function() {
	play(1);
})

$("#parallel").click(function() {
	play(2);
})

$("#masquerade").click(function() {
	play(3);
})

$("#underyourspell").click(function() {
	play(4);
})

$("#nightcall").click(function() {
	play(5);
})

$("#desire").click(function() {
	play(6);
})