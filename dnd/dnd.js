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

function randomName() {
    var name = "";
    var length = Math.floor(Math.random() * 7 + 3)
    var vowels = "aeiou"
    var consonants = "qwrtps'-dfgyhjklzxcvbnm"
    var startingletters = "qwertyuiopasdfghjklzxcvbnm"
    var letters = [vowels, consonants]
    name += getRand(startingletters).toUpperCase() + getRand(startingletters)
    for (var i=2; i<length; i++) {
        var tmpLetter = getRand(getRand(letters))
        if (((consonants.indexOf(name[i-1]) !== -1) && (consonants.indexOf(name[i-2]) != -1))) {//if the last two letters are either vowels or consonants, picc the other one
            tmpLetter = getRand(vowels);
        } else if ((vowels.indexOf(name[i-1]) !== -1) && (vowels.indexOf(name[i-2]) != -1)) {
            tmpLetter = getRand(consonants)
        }

        //then add it to the name
        name += tmpLetter;
    }

	//make sure the first two letters aren't consonants, if so, add a vowel between them
	if (((consonants.indexOf(name[0].toLowerCase()) !== -1) && (consonants.indexOf(name[1]) !== -1))) {
		name = name.slice(0, 1) + getRand(vowels) + name.slice(1);
	}
    return name;
}

function randomSpell() {
    var output = "";
    if (Math.random() <= .4) {
        output += randomName() + "'s "
    } else output += getRand(spell1)
	output += " " + getRand(spell2) + " of " + getRand(spell3)
	return output
}

function randomCurse() {
	return getRand(curse1) + " " + getRand(curse2) + " of " + getRand(curse3)
}

function randomClothes() {
	return getRand(clothes1) + " " + getRand(clothes2) + " of " + getRand(clothes3)
}

function randomItem() {
	return getRand(item1) + " " + getRand(item2) + " of " + getRand(item3)
}

function getRand(arr) {
	var outcome = Math.floor(Math.random() * arr.length)
	return arr[outcome]
}

$("#spells").click(function() {
	document.getElementById("spells").innerHTML = randomSpell()
})

$("#curses").click(function() {
	document.getElementById("curses").innerHTML = randomCurse()
})

$("#clothes").click(function() {
	document.getElementById("clothes").innerHTML = randomClothes()
})

$("#items").click(function() {
	document.getElementById("items").innerHTML = randomItem()
})
