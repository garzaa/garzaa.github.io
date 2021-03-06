console.log("shoutout to /r/behindthetables")

var day = true;

if (localStorage.getItem("day") != null	) {
	day = localStorage.getItem("day") == "true"
}

if (!day) {
	$("head").append('<link id="nightcss" href="night.css" rel="stylesheet"/>')
} else {
	$("head").append('<link id="daycss" href="day.css" rel="stylesheet"/>')
}

function toggleDay() {
	day = !day;
	$("#daycss, #nightcss").remove();
	if (!day) {
		$("head").append('<link id="nightcss" href="night.css" rel="stylesheet"/>')
	} else {
		$("head").append('<link id="daycss" href="day.css" rel="stylesheet"/>')
	}
	localStorage.setItem("day", day)
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
	var outcome = ""
	if (Math.random() < .4) {
		outcome += getRand(item1) + " "
	}
	outcome += getRand(item2) + " of " + getRand(item3)
	return outcome[0].toUpperCase() + outcome.substring(1)
}

function getRand(arr) {
	var outcome = Math.floor(Math.random() * arr.length)
	return arr[outcome]
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$("#spells").click(function() {
	document.getElementById("outcome-title").innerHTML = randomSpell()
	document.getElementById("outcome-text").innerHTML = ""
})

$("#curses").click(function() {
	document.getElementById("outcome-title").innerHTML = randomCurse()
	document.getElementById("outcome-text").innerHTML = ""
})

function clearResults() {
	document.getElementById("outcome-title").innerHTML = ""
	document.getElementById("outcome-text").innerHTML = ""
}
