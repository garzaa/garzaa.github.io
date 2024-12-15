function binStartup() {
}

var terminalFunctions = [
"about",
"clear",
"chan",
"dice",
"echo",
"help",
"locate",
"log",
"ls",
"purge",
"re",
"reddit",
"screenfetch",
"time",
"weather",
]

var help = {
	main: function(args) {
		if (args.length == 0) {
			render("Usage: help [function]");
			render("Try 'ls' to see all functions and any saved files or bookmarks.");
			return;
		}
		if (terminalFunctions.includes(args[0]) || editFunctions.includes(args[0])) {
			render(window[args[0]].helpText)
		} else {
			render("Command not found.");
		}
	},
	helpText: ':^)',
}

var ls = {
	main: function(args) {
		var one = (hcat(hcat(
			"[system]\n"+terminalFunctions.join('\n'), 
			"[edit]\n"+editFunctions.join('\n')
		),
		"[files]\n"+getFileNames()));

		render(hcat(
			one, 
			"[bookmarks]\n"+getBookmarkNames()));
	},
	helpText: 'Lists all functions and files.'
}

var clear = {
	main: function() {
		var data = '<span id="prompt" class="prompt">' + getName() + '@' + getMachine() +
	    	':$&nbsp;</span><span id="input" contenteditable="true" autofocus="true" spellcheck="false"></span>'
	    document.getElementById("terminal").innerHTML = data;
	   	addListeners();
	   	$("#input").focus();
	},
	helpText: "Clears the terminal."
}

var template = {
	main: function() {
	},
	helpText: ""
}

var re = {
	main: function() {
		location.reload();
	},
	helpText: "Reloads the page."
}

var log = {
	main: function(args) {
		if (args[0] === "--clear") {
			lastInputs = [];
			render("Command logs cleared.");
		}

		for (var h=lastInputs.length-1; h>=0; h--) {
			render(lastInputs[h]);
		}
	},
	helpText: "Shows the command history. Run with --clear to remove history."
}

var purge = {
	main: function(args) {
		if (args[0] === "--force") {
			localStorage.clear();
			render("Local storage cleared. Reloading...");
			re.main();
		} else {
			render("Are you sure you want to delete local storage?");
			render("This will delete everything, including your bookmarks! Back that shit up.");
			render("Rerun with '--force' to confirm.");
		}
	},
	helpText: 'Clears all local storage. Requires confirmation.'	
}

var about = {
	main: function() {
		render("Terminal v2", "dodgerblue");
		render(
			"Features include file editing, history, tab autocompletion, weather, and improved extensibility.\n"+
			"For local configuration, save a file called .config with the properties you want to override.\n"+
			"Run 'terminal' in the dev console to see the possible override properties.\n"+
			"You can also create a .bookmarks file (linkTitle https://link.com/).\n"+
			"Put something in a file called .art to add your custom ASCII art to screenfetch.\n"+
			"Finally, you can put arbitrary startup code to execute in your .startup file. Errors are handled automatically."+
			"\nTo see the full functionality, type 'ls'."
		)
	},
	helpText: "Displays terminal info."
}

var echo = {
	main: function(args) {
	    if (args.length == 0) {
	        render("usage: echo [text]")
	        return
	    }
	    var printStr = args.join(" ")
	    //greentexting
	    if(printStr.indexOf("&gt;") === 0 ||
	        printStr.indexOf(">") === 0) {
	        printStr = cssColor(printStr, "#789922")
	    }
	    render(printStr);
	},
	helpText: 'Outputs the entered text to the console.'
}

var screenfetch = {
	main: function() {
		var artBlob = files[".art"] ||
		" _________\n"+
		"|  _____  |\\\n"+
		"| |\\ ___| | \\\n"+
		"| | |   | | |\n"+
		"| | |___| | |\n"+
		"\\ | |____\\| |\n"+
		" \\|_________|\n";

    	var screenfetchBody =  terminal.userName+'@'+terminal.userMachine+'\n'+
	        'OS: '+getOS()+'\n'+
	        'Browser: '+getBrowser()+'\n'+
	        'Engine: '+getEngine()+'\n'+
	        'Resolution: '+window.screen.width+'x'+window.screen.height+'\n'+
	        'Language: '+navigator.language+'\n'+
	        // 'Plugins: '+navigator.plugins.length; - deprecated, shows incorrect / obsilete data

		render(hcat(artBlob, screenfetchBody));
	},
	helpText: "Displays system info, along with some ASCII art you can specify in '.art'."
}

var time = {
	main: function() {
		render(getTime());
	},
	helpText: 'Logs the current local time.',
}

var reddit = {
	main: function(arg) {
		if (arg[0] == undefined || arg[0].toString() == '') {
			render("Usage: /r/subreddit or /u/user");
		}
		if (arg[0].toString().slice(0,3) === "/u/" && arg[0].toString().slice(4) != '') {
			loadURL("https://www.reddit.com" + arg[0].toString())
			return;
		} else if (arg[0].toString().slice(0,3) === "/r/" && arg[0].toString().slice(4) != '') {
			loadURL("https://www.reddit.com" + arg[0].toString())
			return;
		} else {
			render("Blank subbreddit or user");
		}
		
	},
	helpText: 'Jumps to a specified subreddit or user.',
}

var chan = {
	main: function() {
		if (arg[0] == undefined || arg[0].toString() == '') {
			render("Usage: /board or /board/")
		} if(str[0] === "/" && (
    	    str[str.length-1] === "/" || str.length < 5)) {
    	    //then it's not guaranteed to be a 4chan board, but let's try it anyway
    	    //everything but the slash at the beginning
    	    loadURL("https://boards.4chan.org/" + str.substr(1))
    	    return true
    	}
	},
	helpText: 'Jumps to a specified 4chan board.',
}

var dice = {
	main: function(args) {
		if (args[0] == undefined || args[0].toString() == '') {
			render("Usage: [count]d[sides][+modifier]")
			render("Count and modifier are optional.")
		}
		str = args.toString();
		//regex for dice matching, either straight or with a modifier (+x)
		if (/^[0-9]*[d][0-9]+$/.test(str)) {

			var tempArr = str.split('d')
			var numDice = Number(tempArr[0])
			if (numDice === 0) numDice = 1
			var numSides = Number(tempArr[1])
			var output = ""
			for (var i=0; i<numDice; i++) {
				var outcome = randRange(numSides)
				output += outcome + " "
			}
			render(output);
			return true
		} else if (/^[0-9]*[d][0-9]+[+][0-9]+$/.test(str)) {
			var regex = /[+][0-9]+/.exec(str)[0];
			modifier = Number(regex.slice(1)) //remove the + to get the modifier
			console.log(modifier)
	
			var tempArr = str.split('d')
			var numDice = Number(tempArr[0])
			if (numDice === 0) numDice = 1
			var numSides = Number(tempArr[1].split("+")[0]) //gross, but works
			var output = ""
			for (var i=0; i<numDice; i++) {
				var outcome = randRange(numSides)
				var temp = outcome + modifier
				//highlight max rolls
				if (outcome === numSides) temp = cssColor(temp, "#b0b0b0")
				output += temp + " "
			}
			render(output);
			return true
		} else {
			render("Usage: [count]d[sides][+modifier]")
			render("Count and modifier are optional.")
		}
	},
	helpText: "Usage: [count]d[sides][+modifier]\nCount and modifier are optional."
}

var weather = {
	main: function() {
		if (!files[".weatherkey"]) {
			render("Looks like you need an OpenWeatherMap API key.");
			render("Go sign up and get one (it's free) and then put it in '.weatherkey'.");
			return;
		}

		if (terminal.lat == "undefined" || terminal.lon == "undefined") {
			render("You don't have any location data stored. Try running 'locate'.");
		}

		//first check if the localStorage version is more than 20 minutes old
	    if (localStorage.getItem("cachedWeatherData") != null) {
	        var weatherData = JSON.parse(localStorage.getItem("cachedWeatherData"));
	        var now = new Date()
	        var then = weatherData.timestamp;
	        var diff = Math.abs(((now - then) / 1000)/60)
	        if (diff < 20) {
	            displayWeather(weatherData);
	            console.log("using cached weather data")
	            return;
	        }
	    } 

	    //set up the right parameters
    	apiKey=files[".weatherkey"];

		var endpoint = "https://api.openweathermap.org/data/2.5/weather?lat="+terminal.lat+"&lon="+terminal.lon+"&appid="+apiKey;

		//retrieve+format data for storage
		$.when($.getJSON(endpoint)).done(function(o) {
			displayWeather(o);
			o.timestamp = new Date();
			localStorage.setItem("cachedWeatherData", JSON.stringify(o))
		})
	},
	helpText: "Displays weather info for the automatically detected location.\nRun 'locate' if you don't have that stored already."
}

function displayWeather(o) {
	//where most of the numerical data is stored in the weather object
	//contains lows, highs, etc
	var wmain = o.main;
	var tCurr = ktof(wmain.temp);
	var tLo = ktof(wmain.temp_min);
	var tHi = ktof(wmain.temp_max);
	var description = o.weather[0].description;
	var code = Number(o.weather[0].id);
	var humid = Number(wmain.humidity);

    var disgusting = (code > 500
    && code < 800
    || Number(tLo) < 30
    || Number(tHi) > 95
    || humid > 75);

    description = description.charAt(0).toUpperCase() + description.slice(1)
    var weatherString = "It's " + tCurr + "&deg; out. " + description + ". "
    disgusting ? weatherString += "Disgusting." : weatherString += "Not bad."
    render(weatherString)
}

var locate = {
	main: function() {
		navigator.geolocation.getCurrentPosition(function(position) {
		    lat = position.coords.latitude;
		    lon = position.coords.longitude;
		});
		terminal.lat = lat+"";
		terminal.lon = lon+"";
		render(lat+":"+lon);
		if (typeof lat != 'undefined') {
			saveTerminal();
		} else {
			render("Unable to find location. Try again?")
			return
		}
	},
	helpText: 'Retrieves and stores latitude and longitude. Needed for weather.'
}
