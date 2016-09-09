if (!toolsShown) {
    document.getElementById("dm-tools-toggle").innerHTML = "less"
    toolsShown = true
} else {
    document.getElementById("dm-tools-toggle").innerHTML = "more"
    toolsShown = false
}
$("#dm-tools").slideToggle(100)
document.getElementById("spells").innerHTML = "Random Scroll/Item Generator"

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
	document.getElementById("spells").innerHTML = "Random Scroll/Item Generator"
})

var spell1 = [
	"Flaming",
	"Icy",
	"Spooky",
	"Poisonous",
	"Electric",
	"Thunderous",
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
    "Disgusting",
    "Greater",
    "Lesser",
    "Inanimate",
    "Arcane",
    "Celestial",
    "Quick",
    "Unimpressive",
    "Disappointing",
    "Condescending",
    "Intelligent",
    "Multidimensional",
    "Cleansing",
    "Disgusting",
    "Oozing",
    "Vitriolic",
    "Acidic",

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
    "embrace",
    "hugs",
    "boot",
    "cloak",
    "armor",
    "various throwing weapons",
    "spear",
    "bolt",
    "gloves",
    "bubble",
    "tornado",
    "puddle",
    "river",
    "spark",
    "droplet",
    "void",
    "dimension",
    "shout",
    "incantation",
    "stomp",
    "whisper",
    "breath",
    "shits",
    "grasp",
    "tickle",
    "speck",
    "phlegm",
    "diarrhea",
    "brick",
    "cloud",
    "knee-high wall",
    "gaze",
    "birds",
    "wink",
    "glare",
    "reflection",
    "slap",
    "visage",
    "orb",
    "field",
    "wind",
    "fizzle",

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
	"pain",
	"public indecency",
	"stupidity",
	"bodily fluids",
	"unbelievable fertility",
	"dirt",
	"stone",
	"attempted murder",
	"cold sweats",
	"terror",
    "bullets",
    "kisses",
    "caresses",
    "existential angst",
    "fingers",
    "haste",
    "trash",
    "despair",
    "air",
    "lightning",
    "blood",
    "flesh",
    "earth",
    "meat",
    "discord",
    "healing",
    "dread",
    "paralysis",
    "drowsiness",

]

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
        if (((consonants.indexOf(name[i-1]) != -1) && (consonants.indexOf(name[i-2]) != -1))) {//if the last two letters are either vowels or consonants, picc a vowel instead
            tmpLetter = getRand(vowels);
        } else if ((vowels.indexOf(name[i-1]) != -1) && (vowels.indexOf(name[i-2]) != -1)) {
            tmpLetter = getRand(consonants)
        }

        //then add it to the name
        name += tmpLetter;
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

function getRand(arr) {
	var outcome = Math.floor(Math.random() * arr.length)
	return arr[outcome]
}

$("#spells").click(function() {
	document.getElementById("spells").innerHTML = randomSpell()
})
