
var modifier = 0;
var dice = 1;

function rollDie(sides) {
	/* var outcome = Math.floor(Math.random() * sides) + 1
	document.getElementById("roll-outcome1").innerHTML = outcome */
	var element
	var outcome
	for (var i=1; i<=10; i++) {
		outcome = Math.floor(Math.random() * sides) + 1
		element = "roll-outcome" + i

		var elementId = "#" + "roll-outcome" + i
		if (outcome == sides && $(elementId).is(":visible")) {
			console.log("critical roll on " + elementId)
			playAirhorn();
		}
		document.getElementById(element).innerHTML = outcome + Number(modifier)
	}
}

function visibleDice(numberDice) {
	var element
	$("#roll-outcome1, #roll-outcome2, #roll-outcome3, #roll-outcome4, #roll-outcome5, #roll-outcome6, #roll-outcome7, #roll-outcome8, #roll-outcome9, #roll-outcome10").each(function() {
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

$("#six").click(function() {
	dice = 6
	visibleDice(6)
})
$("#seven").click(function() {
	dice = 7
	visibleDice(7)
})
$("#eight").click(function() {
	dice = 8
	visibleDice(8)
})
$("#nine").click(function() {
	dice = 9
	visibleDice(9)
})
$("#ten").click(function() {
	dice = 10
	visibleDice(10)
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
		case 32:
			playAirhorn();
			break;
	}
})
