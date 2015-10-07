var songs = [
			"revelinyourtime.mp3",
			"pinkmist.mp3",
			"parallel.mp3",
			"haunted.mp3",
			"masquerade.mp3",
			"underyourspell.mp3",
			"nightcall.m4a",
			"desire.mp3"
			];

var currentsong = new Audio(songs[0]);
var trackDuration = currentsong.duration;
var track = 0;
var playing = false;
var firstClick = true;

function play(trackNumber) {
	firstClick = false;
	playing = true;
	trackDuration = currentsong.duration;
	document.getElementById("pause").innerHTML = "[pause]"
	track = trackNumber;
	currentsong.pause();
	currentsong.currentTime = 0;
	currentsong = new Audio(songs[trackNumber]);
	currentsong.play();
	currentsong.onended = function() {
		if (track != songs.length-1) {
			play(track + 1);
		} else { play(0); }
	}
	switch (track) {
		case 0:
			changeInfo("Revel In Your Time", "Gunship");
			break;
		case 1:
			changeInfo("Pink Mist", "Gunship");
			break;
		case 2:
			changeInfo("Parallel", "Stellar Dreams");
			break;
		case 3:
			changeInfo("Haunted When The Minutes Drag", "Love &amp; Rockets");
			break;
		case 4:
			changeInfo("Masquerade", "Clan Of Xymox");
			break;
		case 5:
			changeInfo("Under Your Spell", "Desire");
			break;
		case 6:
			changeInfo("Nightcall", "Kavinsky");
			break;
		case 7:
			changeInfo("Desire", "Perturbator &amp; Greta Link");
			break;
		
	}
}

$("#revelinyourtime").click(function() {
	play(0);
	changeInfo("Revel In Your Time", "Gunship");
})

$("#pinkmist").click(function() {
	play(1);
	changeInfo("Pink Mist", "Gunship");
})

$("#parallel").click(function() {
	play(2);
	changeInfo("Parallel", "Stellar Dreams");
})

$("#haunted").click(function() {
	play(3);
	changeInfo("Haunted When The Minutes Drag", "Love &amp; Rockets");
})

$("#masquerade").click(function() {
	play(4);
	changeInfo("Masquerade", "Clan Of Xymox");
})

$("#underyourspell").click(function() {
	play(5);
	changeInfo("Under Your Spell", "Desire");
})

$("#nightcall").click(function() {
	play(6);
	changeInfo("Nightcall", "Kavinsky");
})

$("#desire").click(function() {
	play(7);
	changeInfo("Desire", "Perturbator &amp; Greta Link");
})

$("#pause").click(function() {
	if (firstClick === true) {
		play(0);
		firstClick = false;
		console.log("first click")
	} else if (playing) {
		currentsong.pause();
		playing = false;
		document.getElementById("pause").innerHTML = "[play]"
	} else {
		currentsong.play();
		playing = true;
		document.getElementById("pause").innerHTML = "[pause]"
	}
})

function updateTrackbar() {
	var percent = (currentsong.currentTime / trackDuration) * 100
	percent += "%"
	$("#trackbar").css("width", percent)
}

setInterval(updateTrackbar, 20)

function changeInfo(song, artist) {
	document.getElementById("songName").innerHTML = song;
	document.getElementById("artistName").innerHTML = artist;
}

var months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			]

var date = new Date()
var month = date.getMonth()+1
var day = date.getDate()
month = months[month - 1]
document.getElementById("month").innerHTML = month;
document.getElementById("day").innerHTML = day;

$("#next").click(function() {
	if (track != songs.length-1) {
			play(track + 1);
		} else { play(0); }
})

$("#prev").click(function() {
	if (track === 0) {
			play(songs.length-1);
		} else { play(track - 1); }
})