$("#airhorn").click(function() {
	playAirhorn();
})

function playSound(soundName) {
	let a = new Audio(soundName+".mp3");
	a.play();
	a.currentTime = 0;
}

$("#bonk").click(function() {
	playSound("bonk");
})

$("#homerun").click(function() {
	playSound("homerun");
})

$("#digging").click(function() {
	playSound("digging");
})


$("#kill").click(function() {
	playSound("kill");
})
