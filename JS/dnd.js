
var modifier = 0;
var dice = 1;

function rollDie(sides) {
	/* var outcome = Math.floor(Math.random() * sides) + 1
	document.getElementById("roll-outcome1").innerHTML = outcome */
	var element
	var outcome
	for (var i=1; i<=5; i++) {
		outcome = Math.floor(Math.random() * sides) + 1 + Number(modifier)
		element = "roll-outcome" + i
		document.getElementById(element).innerHTML = outcome;
	}
}

function visibleDice(numberDice) {
	var element
	$("#roll-outcome1, #roll-outcome2, #roll-outcome3, #roll-outcome4, #roll-outcome5").each(function() {
		$(this).hide();
	})
	for (var i=1; i<=numberDice; i++) {
		element = "#" + "roll-outcome" + i
		$(element).show();
	}
}

$("#modifier").click(function() {
	modifier = prompt("enter a modifier:")
	if (modifier == "" || isNaN(modifier) || !modifier) {
		modifier = "0";
	}
	document.getElementById("modifier").innerHTML = "+" + modifier;
})

$("#d4").click(function() {
	rollDie(4);
})

$("#d6").click(function() {
	rollDie(6);
})

$("#d8").click(function() {
	rollDie(8);
})

$("#d10").click(function() {
	rollDie(10);
})

$("#d12").click(function() {
	rollDie(12);
})

$("#d20").click(function() {
	rollDie(20);
})

$("#one").click(function() {
	dice = 1
	visibleDice(1)
})
$("#two").click(function() {
	dice = 2
	visibleDice(2)
})
$("#three").click(function() {
	dice = 3
	visibleDice(3)
})
$("#four").click(function() {
	dice = 4
	visibleDice(4)
})
$("#five").click(function() {
	dice = 5
	visibleDice(5)
})

$("#dm-tools-toggle").click(function() {
	$("#dm-tools").slideToggle(100)
	document.getElementById("spells").innerHTML = "Random Spell"
})

var spell1 = [
	"Flaming",
	"Icy",
	"Spooky",
	"Poisonous",
	"Electric",
	"Thunderous",
	"Water",
	"Psychic",
	"Spicy",
	"Massive",
	"Magnetic",
	"Radioactive",
	"Tiny",
	"Ineffective",
	"Weak",
	"Terrifying",
	"Sticky",
	"Singing",
	"Bouncing",
	"Spinning",
	"Homing",
	"Short-lived",
	"Holy",
	"Necrotic",
	"Elemental",
	"Freezing",
	"Long-range",
	"Unsettling",
	"Laughably shitty",
	"Miniscule",
	"Loving",
	"Invisible",
	"Stunning",
	"Misfiring",
	"Unfortunate",
	"Self-inflicted",
	"Mild",
	"Flaccid",
	"Petulant",

]

var spell2 = [
	"sphere",
	"sword",
	"finger",
	"foot",
	"wave",
	"fist",
	"rune",
	"storm",
	"cyclone",
	"whirlwind",
	"storm",
	"meteor",
	"rod",
	"spray",
	"cone",
	"touch",
	"punch",
	"shield",
	"arrow",
	"needles",
	"ball",
	"golem",
	"familiar",
	"homunculus",
	"spider",
	"touches",
	"rain",
	"cannonball",
	"geyser",
	"beam",
	"wall",
	"hands",

]

var spell3 = [
	"murder",
	"death",
	"lust",
	"chaos",
	"vengeance",
	"Kung Fu",
	"punching",
	"rage",
	"molten metal",
	"mind control",
	"spiders",
	"hallucinations",
	"violation",
	"penetration",
	"pain",
	"public indecency",
	"stupidity",
	"shit",
	"bodily fluids",
	"unbelievable fertility",
	"dirt",
	"stone",
	"attempted murder",
	"cold sweats",
	"terror",

]

function randomSpell() {
	var output = getRand(spell1) + " " + getRand(spell2) + " of " + getRand(spell3)
	return output
}

function getRand(arr) {
	var outcome = Math.floor(Math.random() * arr.length)
	return arr[outcome]
}

$("#spells").click(function() {
	document.getElementById("spells").innerHTML = randomSpell()
})

function setModifier() {
	modifier = prompt("enter a modifier:")
	if (modifier == "" || isNaN(modifier) || !modifier) {
		modifier = "0";
	}
	document.getElementById("modifier").innerHTML = "+" + modifier;
}

$(document).keypress(function (e) {
	switch (e.which) {
		case 49:
			rollDie(12);
			break;
		case 50:
			rollDie(20);
			break;
		case 52:
			rollDie(4);
			break;
		case 54:
			rollDie(6);
			break;
		case 56:
			rollDie(8);
			break;
		case 48:
			rollDie(10);
			break;
		case 13:
			setModifier();
			break;
	}
})
