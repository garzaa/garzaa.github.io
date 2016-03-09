/*
TO DO

*/

//game logic
var room = menu
var name = "Boogston"
var male = true
var straight = true
var white = false
var fat = false
var girls = 10;
var configured = false
var achievements = []
var nightMode = true //fighter of the daymode
var checked = false

function reset() {
	name = "Boogston"
	male = true
	straight = true
	white = false
	fat = false
	girls = 10;
	configured = false
	achievements = []
	player.shots = 0
	player.health = 10
	player.privilege = 0
	player.deaths = 0
}

function gameHandle(str) {
	if (str[0] == "~") {
		eval(str.slice(1, str.length))
	}
	str = str.toLowerCase();
	if (str == "help") {
		render("scene | stats | privilege | menu")
	} else if (str == "menu") {
		switchRoom(menu);
	} else if (str == "privilege") {
		renderPrivilege()
	} else if (str == "stats") {
		renderStats()
	} else if (str == "scene" || str == "ls") {
		room.renderTitle();
	} else if (str == "c") {
		configured = true;
	} else if (str == "airhorn") {
		playAirhorn();
		room.handleInput(str);
	} else if (str == "nightmode") {
		toggleNight();
	} else {
		room.handleInput(str);
	}
}

function toggleNight() {
	if (nightMode) {
		nightMode = false;
		$("#input").css("color", "black");
		$("#terminal-container").css("color", "black")
		$("#terminal-container").css("background-color", "white")
	} else {
		nightMode = true
		$("#input").css("color", "white");
		$("#terminal-container").css("color", "white")
		$("#terminal-container").css("background-color", "black")
	}
}

function renderStats() {
	output = name + " the "
	straight ? output += "straight " : output += "gay "
	white ? output += "white " : output += "Ethnic&trade; "
	fat ? output += "fat " : output += ""
	male ? output += "male " : output += "woman "
	render(output, "dodgerblue", 12)
	//shortcuts for printing health & drunk levels
	modHealth(0);
	player.modDrunk(0);
}

function renderAchievements() {
	if (achievements.length > 0) {
		for (var i=0; i<achievements.length; i++) {
			render(achievements[i], "dodgerblue", 12)
		}
		render("")
	} else {
		render("Nothing here!")
	}
}

function switchRoom(newRoom) {
	room = newRoom;
	room.renderTitle();
}

function endGame() {
	render("Privilege status:");
	var privilege = player.privilege;
	switch(true) {
		case privilege <= 0:
			render("ULTIMATE SEXUAL RESPECTOR", 'hotpink', 12)
			unlock("ULTIMATE SEXUAL RESPECTOR")
			break;
		case privilege <= 500:
			render("Mild asshole")
			break
		case privilege <= 1000:
			render("Dickhead")
			break;
		case privilege <= 2000:
			render("Fuccboi Supreme")
			break
		case privilege <= 2500:
			render("Absolute Goddamn Shitlord")
			break
		case privilege <= 9000:
			render("Hitler's Wet Dream")
			unlock("Hitler's Wet Dream")
			break
	}
	console.log("this should go to the menu")
	render("You have died " + player.deaths + " times.")
	switchRoom(menu)
	player.health = 10;
	player.shots = 0;
}

function killPlayer() {
	render("You're dead! Game over, shitlord.")
	player.deaths += 1;
	endGame()
}

function unlock(str) {
	if (achievements.indexOf(str) == -1) {
		render("You unlocked a new achievement!", "hotpink", 12);
		render(str, "dodgerblue", 12);
		achievements.push(str);
	}
}

function modPrivilege(str, num) {
	num > 0 ? render(str, "indianred", 12) : render(str, "limegreen", 12)
	player.privilege += num;
	if (player.privilege <= 0 && checked == false) {
		checked = true
		render("Congratulations, you have successfully checked your privilege!")
		unlock("ULTIMATE SEXUAL RESPECTOR")
	}
}

function renderPrivilege() {
	render("Your current privilege is " + player.privilege)
}

function killGirl() {
	girls -= 1
	switch (true) {
		case girls <= 0:
			render("You killed every girl at the party! You monster.");
			modPrivilege("Nice! +5000 murder privilege.", 5000)
			unlock("SHE IS YOUNG, SHE IS BEAUTIFUL, SHE IS NEXT");
			break;
		case girls < 4:
			render("There suddenly seem to be very few girls at the party.\
			The guys seem lost and confused.")
			break;
		case girls < 7:
			render("There seem to be considerably fewer girls at the party.\
			Some guys are looking around in confusion.")
			break;
		case girls > 0:
			render("Another girl has died. Nobody at the party seems to notice.")
			break
	}
}

function modHealth(num) {
	player.health < 11 ? player.health += num : player.health = 10;
	switch (true) {
		case (player.health < 1):
			killPlayer();
			break;
		case (player.health < 2):
			render("You are grievously injured. Blood pools on the ground.")
			break;
		case player.health < 5:
			render("You are in a lot of pain.")
			break;
		case player.health < 7:
			render("Everything hurts.")
			break;
		case player.health < 10:
			render("You think maybe you should stop hurting yourself.")
			break;
		case player.health == 10:
			render("You are dead inside, but otherwise feel fine!")
			break;
	}
}

function drunk() {
	return (player.shots > 3);
}

var player = {
	shots: 0,
	health: 10,
	privilege: 0,
	deaths: 0,
	modDrunk: function(number) {
		number > 0 ? modPrivilege("Delicious! +10 alcohol privilege.", 10) : true
		player.shots += number;
		var num = player.shots;
		switch (true) {
			case (num == 0):
				render("You are stone-cold sober.");
				break;
			case (num < 2):
				render("You are mostly sober.")
				break;
			case num < 5:
				render("You are tipsy.")
				break;
			case num < 7:
				render("You're making an ass of yourself.")
				break;
			case num < 10:
				render("You are falling-down drunk.")
				break;
			case num == 10:
				render("You are about to die, yet you keep drinking.")
				break;
			case num > 10:
				unlock("Dead Drunk");
				killPlayer();
				break;
		}
	}
}

function renderOptions(currentRoom) {
	if(currentRoom.options) {
		var arr = currentRoom.options;
		render("");
		for (var i=0; i<arr.length; i++) {
			render((i+1) + "&nbsp;&nbsp;" + arr[i]);
		}
	}
}
