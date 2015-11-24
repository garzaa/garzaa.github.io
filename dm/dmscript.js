//global helpers
function d(sides) {	
	return Math.floor(Math.random() * sides) + 1
}

var enemies = []

function addStats(o) {
	var output = "<div class='stats-container'>"
	var statsArray = [
	"<h3>" + o.hp + " HP" + "</h3>",
	"Speed: +" + o.speed,
	"STR: +" + o.STR,
	"DEX: +" + o.DEX,
	"CON: +" + o.CON,
	"WIS: +" + o.WIS,
	"CHA: +" + o.CHA,
	]

	for (var i=0; i<statsArray.length; i++) {
		statsArray[i] = "<p class='stat'>" + statsArray[i] + "</p>"
		output += statsArray[i]
	}
	output += "</div>"
	return output
}

function render(obj) {
	var output
	var preWrapper = "<div id=" + obj.id + " class='enemyCard'>"
	var name="<h2 class='name'>" + obj.name + "</h2>"

	var statsList = "<ul>"
	statsList += addStats(obj) + "</ul>"

	var postWrapper = "</div>"
	output = preWrapper + name + statsList + postWrapper
	$("#enemies").prepend(output)
	console.log("rendered!")
}

//enemy counters
var laps = 0

//enemy objects

//lightly armored pirate
function lap() {
	laps++
	this.id = "lap" + laps
	enemies.push(this.id)
	this.name = "Lightly Armed Pirate " + laps

	this.hp = 10 + d(6)
	this.ac = 8
	this.speed = 30

	this.STR = 2
	this.DEX = 0
	this.CON = 3
	this.WIS = 0
	this.CHA = 0
	function dmg() {
		this.hp =- 1
		this.updateHP()
		if (this.hp <= 0) {
			this.kill()
		}
	}

	function updateHP() {
		//to be coded later
	}

	function kill() {
		//to be coded later
	}
	render(this)
}

$("#lap").click(function() {
	lap()
})


//random spells
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
			"Brimstone",
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
		]

		var spell2 = [
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
			"touch",
			"punch",
			"shield",
			"arrow",
			"needles",
			"ball",

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
			"metal",
			"mind control",
			"spiders",
			"hallucination",
			"violation",
			"penetration",
			"pain",
			"public indecency",
			"stupidity",
			"dog shit",

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