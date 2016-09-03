function playAirhorn() {
		var airhorn = new Audio("../dnd/airhorn.mp3");
		airhorn.play();
		airhorn.currentTime = 0;
        flash();
}

function flash() {
		var red = false;
		var flashCount = 0;
		var flashing = window.setInterval(function() {

			if (!red) {
				document.body.style.backgroundColor = "red"
				red = true

			} else {
				document.body.style.backgroundColor = "white"
				red = false
			}
			flashCount++
			if (flashCount >= 100) {
				clearInterval(flashing)
			}
		}, 10);
}
