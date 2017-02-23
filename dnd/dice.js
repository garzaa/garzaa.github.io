
var modifier = 0;
var dice = 1;
var airhornEnabled = true;

var diceNumbers = [
	2, 4, 6, 8, 10, 12, 20, 100
]

var maxDice = 10

function rollDie(sides) {
	/* var outcome = Math.floor(Math.random() * sides) + 1
	document.getElementById("roll-outcome1").innerHTML = outcome */
	var element
	var outcome
	for (var i=1; i<=10; i++) {
		outcome = Math.floor(Math.random() * sides) + 1
		element = "roll-outcome" + i

		var elementId = "#" + "roll-outcome" + i
		if (outcome == sides && $(elementId).is(":visible") && airhornEnabled) {
			playAirhorn();
		}
		document.getElementById(element).innerHTML = outcome + Number(modifier)
	}
}

function visibleDice(numberDice) {
	var element
	dice = numberDice
	$("#roll-outcome1, #roll-outcome2, #roll-outcome3, #roll-outcome4, #roll-outcome5, #roll-outcome6, #roll-outcome7, #roll-outcome8, #roll-outcome9, #roll-outcome10").each(function() {
		$(this).hide();
	})
	for (var i=1; i<=numberDice; i++) {
		element = "#" + "roll-outcome" + i
		$(element).show();
	}
}


$(document).ready(function() {
	addDice();
	addCustomDie(3);
	addBr();
	addVisDice();
	addModifier();
})

function addDice() {
	for (var i=0; i<diceNumbers.length; i++) {
		$("#dice-buttons").append(
			'<span class="dicebutton" onclick="rollDie(' +
			diceNumbers[i] + ')">D' + diceNumbers[i] + '</span>'
		)
	}
}

function addBr() {
	$("#dice-buttons").append('<br>')
}

function addModifier() {
	$("#dice-buttons").append('<span id="modifier" onclick="setModifier()" class="dicebutton">+0</span>')
	$("#dice-buttons").append('<span class="dicebutton" onclick="setCustomDie()">DX</span>')
}

function addVisDice() {
	$("#dice-buttons").append(
		'<span class="dicebutton" onclick="visibleDice(' +
		1 + ')">' + 1 + ' die</span>'
	)
	for (var i=2; i<maxDice+1; i++) {
		$("#dice-buttons").append(
			'<span class="dicebutton" onclick="visibleDice(' +
			i + ')">' + i + ' dice</span>'
		)
	}

	//now add the roll outcomes
	$("#dicecontainer").append('<span id="roll-outcome1" class="roll-outcome">0</span>')
	for (var i=2; i<maxDice+1; i++) {
		$("#dicecontainer").append(
			'<span id="roll-outcome'+i+'" class="roll-outcome" style="display: none;">0</span>'
		)
	}
}

function addCustomDie(num) {
	$("#dice-buttons").append(
		'<span class="dicebutton" id="customDie" onclick="rollDie(' +
		num + ')">D' + num + '</span>'
	)
}

function setCustomDie() {
	temp = prompt("enter a number of sides:")
	if (temp == "" || isNaN(temp) || !temp || temp < 1) {
		temp = "3";
	}
	$("#customDie").attr("onclick", "rollDie(" + temp +")").text("D" + temp)
}

function setModifier() {
	modifier = prompt("enter a modifier:")
	if (modifier == "" || isNaN(modifier) || !modifier) {
		modifier = "0";
	}
	document.getElementById("modifier").innerHTML = "+" + modifier;
}
