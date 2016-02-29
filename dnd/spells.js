var toolsShown = false
$("#dm-tools-toggle").click(function() {

    if (!toolsShown) {
        document.getElementById("dm-tools-toggle").innerHTML = "less"
        toolsShown = true
    } else {
        document.getElementById("dm-tools-toggle").innerHTML = "more"
        toolsShown = false
    }
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
