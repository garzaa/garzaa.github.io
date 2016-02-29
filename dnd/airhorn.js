var epilepsy = false

if (localStorage.epilepsy) {
    if (localStorage.epilepsy == 1) {
        epilepsy = true
        document.getElementById("epilepsy").innerHTML = "More Flashing"
    }
}

function playAirhorn() {
		var airhorn = new Audio("airhorn.mp3");
		airhorn.play();
		airhorn.currentTime = 0;
		if (epilepsy == true) { flash() }
		if (localStorage.airhorncount) {
			localStorage.airhorncount++;
			if (localStorage.airhorncount == 100 ||
				localStorage.airhorncount % 1000 == 0) {
				prompt("Congratulations!\nYou've been dank af " + localStorage.airhorncount + " times!")
			}
		} else {
			localStorage.airhorncount = 1
		}
		console.log("Airhorned " + localStorage.airhorncount + " times")
}

$("#airhorn").click(function() {
	playAirhorn();
})

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

function toggleFlashing() {
    if (epilepsy) {
        document.getElementById("epilepsy").innerHTML = "More Flashing"
    } else {
        document.getElementById("epilepsy").innerHTML = "Less Flashing"
    }
    epilepsy = !epilepsy
    if (epilepsy) {
        localStorage.epilepsy = 1
    } else {
        localStorage.epilepsy = 0
    }
}

$("#epilepsy").click(function() {
	toggleFlashing();
})
