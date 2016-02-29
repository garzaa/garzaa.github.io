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
			if (flashCount >= 200) {
				clearInterval(flashing)
			}
		}, 10);
}